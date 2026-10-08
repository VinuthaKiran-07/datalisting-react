
import { useEffect, useMemo, useRef, useState } from 'react';
import { getPosts } from './services/api';
import { transformPosts } from './utils/transformPosts';

import Header from './components/Header';
import Icon from './components/Icon';
import ViewSwitcher from './components/ViewSwitcher';
import Pagination from './components/Pagination';
import { CardView, ListView, TableView } from './components/Views';
import { EmptyState, ErrorState, LoadingState } from './components/States';
import PostDetailsDrawer from './components/PostDetailsDrawer';

import './styles.css';

// Local Storage Helpers
const readStorage = (key, fallback, allowed) => {
  try {
    const value = localStorage.getItem(key);
    return allowed.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
};

const saveStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Browsing still works when storage is unavailable. */
  }
};

export default function App() {
  // State Management
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [author, setAuthor] = useState('all');
  const [sort, setSort] = useState('newest');

  const [view, setView] = useState(() =>
    readStorage('viewMode', 'card', ['card', 'list', 'table'])
  );

  const [theme, setTheme] = useState(() =>
    readStorage('theme', 'light', ['light', 'dark'])
  );

  const [libraryOpen, setLibraryOpen] = useState(true);

  const [density, setDensity] = useState(() =>
    readStorage('rowDensity', 'comfortable', [
      'compact',
      'comfortable',
      'spacious',
    ])
  );

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedPost, setSelectedPost] = useState(null);

  const explorerRef = useRef(null);

  // Side Effects
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveStorage('theme', theme);
  }, [theme]);

  useEffect(() => {
    saveStorage('viewMode', view);
  }, [view]);

  useEffect(() => {
    saveStorage('rowDensity', density);
  }, [density]);

  useEffect(() => {
    loadPosts();
  }, []);

  // API Data Fetching
  async function loadPosts() {
    setLoading(true);
    setError('');

    try {
      setPosts(transformPosts(await getPosts()));
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  // Derived Data
  const categories = useMemo(
    () => [...new Set(posts.map((post) => post.category))].sort(),
    [posts]
  );

  const authors = useMemo(
    () => [...new Set(posts.map((post) => post.author))].sort(),
    [posts]
  );

  const categoryCounts = useMemo(
    () =>
      posts.reduce(
        (counts, post) => ({
          ...counts,
          [post.category]: (counts[post.category] || 0) + 1,
        }),
        {}
      ),
    [posts]
  );

  // Search, Filter and Sort
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return posts
      .filter((post) =>
        [
          post.title,
          post.excerpt,
          post.body,
          post.author,
          post.category,
        ].some((value) => value.toLowerCase().includes(query))
      )
      .filter(
        (post) => category === 'all' || post.category === category
      )
      .filter(
        (post) => author === 'all' || post.author === author
      )
      .sort((a, b) =>
        sort === 'title-az'
          ? a.title.localeCompare(b.title)
          : sort === 'title-za'
          ? b.title.localeCompare(a.title)
          : sort === 'oldest'
          ? a.date.localeCompare(b.date)
          : sort === 'views'
          ? b.views - a.views
          : sort === 'least'
          ? a.views - b.views
          : b.date.localeCompare(a.date)
      );
  }, [posts, search, category, author, sort]);

  // Pagination Logic
  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / perPage)
  );

  const safePage = Math.min(page, totalPages);

  const pageItems = filtered.slice(
    (safePage - 1) * perPage,
    safePage * perPage
  );

  // Event Handlers
  const reset = () => {
    setSearch('');
    setCategory('all');
    setAuthor('all');
    setSort('newest');
    setPage(1);
  };

  const scrollToResults = () =>
    requestAnimationFrame(() =>
      explorerRef.current?.scrollTo({
        top: 0,
        behavior: window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches
          ? 'instant'
          : 'smooth',
      })
    );

  useEffect(() => {
    explorerRef.current?.scrollTo({ top: 0 });
  }, [view, search, category, author, sort, perPage]);

  const goToPage = (next) => {
    setPage(Math.max(1, Math.min(next, totalPages)));
    scrollToResults();
  };

  const selectCategory = (value) => {
    setCategory(value);
    setPage(1);
  };

  const activeFilters =
    search || category !== 'all' || author !== 'all';

  // JSX Layout
  return (
    <div className="app-shell" id="top" data-density={density}>
      
      <Header
        libraryOpen={libraryOpen}
        onToggleLibrary={() =>
          setLibraryOpen((open) => !open)
        }
        theme={theme}
        onToggleTheme={() =>
          setTheme(theme === 'light' ? 'dark' : 'light')
        }
      />

      <div
        className={`workspace ${
          libraryOpen ? 'library-open' : 'library-closed'
        }`}
      >
        {/* Sidebar */}
        <div
          className="sidebar-track"
          inert={!libraryOpen}
          aria-hidden={!libraryOpen}
        >
          <aside
            id="library-panel"
            className="sidebar"
            aria-label="Collection filters"
          >
            <div className="sidebar-heading">
              <h2>Your library</h2>
              <span>{loading ? '…' : posts.length}</span>
            </div>

            <p className="sidebar-description">
              A little perspective.
              <br />
              A lot to explore.
            </p>

            <nav
              className="category-nav"
              aria-label="Filter by category"
            >
              <button
                className={category === 'all' ? 'selected' : ''}
                aria-pressed={category === 'all'}
                onClick={() => selectCategory('all')}
              >
                <span>All posts</span>
                <span>{posts.length}</span>
              </button>

              {categories.map((item) => (
                <button
                  key={item}
                  className={
                    category === item ? 'selected' : ''
                  }
                  aria-pressed={category === item}
                  onClick={() => selectCategory(item)}
                >
                  <span>{item}</span>
                  <span>{categoryCounts[item]}</span>
                </button>
              ))}
            </nav>

            <label className="mobile-category">
              Category

              <select
                value={category}
                onChange={(e) =>
                  selectCategory(e.target.value)
                }
              >
                <option value="all">
                  All categories
                </option>

                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="author-filter">
              Filter by author

              <select
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                  setPage(1);
                }}
              >
                <option value="all">All authors</option>

                {authors.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <p className="collection-source">
              Demo collection · {authors.length} authors
              <br />
              Content and metadata are illustrative.
            </p>
          </aside>
        </div>

        {/* Main Content */}
        <main>
          {/* Collection Heading */}
          <section className="collection-header">
            <div>
              <h1>
                {category === 'all'
                  ? 'Room for a new perspective.'
                  : category}
              </h1>

              <p>
                Browse the collection. Find an idea.
                Read it all here.
              </p>
            </div>
          </section>

          {/* Toolbar */}
          <section
            className="toolbar"
            aria-label="Explore controls"
          >
            <div className="reading-preferences">
              <label>
                Row density

                <select
                  aria-label="Row density"
                  value={density}
                  onChange={(event) =>
                    setDensity(event.target.value)
                  }
                >
                  <option value="compact">Compact</option>
                  <option value="comfortable">
                    Comfortable
                  </option>
                  <option value="spacious">Spacious</option>
                </select>
              </label>
            </div>

            {/* Search */}
            <div className="search-wrap">
              <Icon name="search" size={20} />

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search anything in the collection…"
                aria-label="Search posts"
              />

              {search && (
                <button
                  className="clear-search"
                  onClick={() => {
                    setSearch('');
                    setPage(1);
                  }}
                  aria-label="Clear search"
                >
                  <Icon name="close" size={18} />
                </button>
              )}
            </div>

            {/* Results and View Controls */}
            <div className="toolbar-bottom">
              <div
                className="results-summary"
                role="status"
              >
                <strong>
                  {loading
                    ? 'Loading collection…'
                    : error
                    ? 'Collection unavailable'
                    : `${filtered.length} ${
                        filtered.length === 1
                          ? 'post'
                          : 'posts'
                      }`}
                </strong>

                {!loading && !error && (
                  <span>
                    Preview · click for full details
                  </span>
                )}

                {activeFilters && (
                  <button
                    className="reset-button"
                    onClick={reset}
                  >
                    Clear filters
                  </button>
                )}
              </div>

              <div className="display-controls">
                <label className="sort-control">
                  Sort

                  <select
                    value={sort}
                    onChange={(e) => {
                      setSort(e.target.value);
                      setPage(1);
                    }}
                  >
                    <option value="newest">
                      Newest first
                    </option>
                    <option value="oldest">
                      Oldest first
                    </option>
                    <option value="title-az">
                      Title A–Z
                    </option>
                    <option value="title-za">
                      Title Z–A
                    </option>
                    <option value="views">
                      Most viewed
                    </option>
                    <option value="least">
                      Least viewed
                    </option>
                  </select>
                </label>

                <ViewSwitcher
                  view={view}
                  onChange={setView}
                />
              </div>
            </div>
          </section>

          {/* Post Explorer */}
          <section
            className={`explorer explorer-${view}`}
            tabIndex={0}
            ref={explorerRef}
            aria-label="Posts"
            aria-busy={loading}
          >
            <div
              key={`${view}-${safePage}`}
              className="view-content"
            >
              {loading ? (
                <LoadingState view={view} />
              ) : error ? (
                <ErrorState onRetry={loadPosts} />
              ) : filtered.length === 0 ? (
                <EmptyState onReset={reset} />
              ) : view === 'card' ? (
                <CardView
                  posts={pageItems}
                  onSelect={setSelectedPost}
                />
              ) : view === 'list' ? (
                <ListView
                  posts={pageItems}
                  onSelect={setSelectedPost}
                />
              ) : (
                <TableView
                  posts={pageItems}
                  onSelect={setSelectedPost}
                />
              )}
            </div>
          </section>

          {/* Pagination */}
          {!loading &&
            !error &&
            filtered.length > 0 && (
              <Pagination
                page={safePage}
                totalPages={totalPages}
                perPage={perPage}
                total={filtered.length}
                onPage={goToPage}
                onPerPage={(value) => {
                  setPerPage(value);
                  setPage(1);
                }}
              />
            )}

          {/* Footer */}
          <footer>
            <span>Post Explorer</span>
            <span>A collection for curious minds.</span>
          </footer>
        </main>

        {/* Post Details Drawer */}
        <PostDetailsDrawer
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      </div>
    </div>
  );
}
