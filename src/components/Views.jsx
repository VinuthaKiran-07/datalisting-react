const categoryClass = (category) => `category category-${category.toLowerCase().replaceAll(' ', '-')}`;
const formatViews = (views) => views.toLocaleString('en-US');
function Meta({ post }) {
  return <div className="post-meta"><div className="author"><span className="avatar" aria-hidden="true">{post.author.split(' ').map((name) => name[0]).join('')}</span><div><strong>{post.author}</strong><span>User {post.userId} · {post.date}</span></div></div><div className="reading-meta"><span>{post.readTime}</span><span>{formatViews(post.views)} views</span></div></div>;
}
function Content({ post }) { return <><h2>{post.title}</h2><p className="post-excerpt">{post.excerpt}</p><span className="view-details">View full details <span aria-hidden="true">↗</span></span></>; }
const interactiveProps = (post, onSelect) => ({ tabIndex: 0, role: 'button', onClick: () => onSelect(post), onKeyDown: (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(post); } } });
export function CardView({ posts, onSelect }) {
  return <div className="card-grid">{posts.map((post) => <article className="post-card" key={post.id} {...interactiveProps(post, onSelect)}><div className="card-top"><span className={categoryClass(post.category)}>{post.category}</span><span className="post-number">Post {String(post.id).padStart(2, '0')}</span></div><Content post={post} /><Meta post={post} /></article>)}</div>;
}
export function ListView({ posts, onSelect }) {
  return <div className="index-list">{posts.map((post) => <article className="index-row" key={post.id} {...interactiveProps(post, onSelect)}><div className="index-heading"><span className="post-number">Post {String(post.id).padStart(2, '0')}</span><span className={categoryClass(post.category)}>{post.category}</span></div><div className="index-content"><Content post={post} /><Meta post={post} /></div></article>)}</div>;
}
export function TableView({ posts, onSelect }) {
  return <div className="table-scroll" tabIndex={0} role="region" aria-label="Posts table, scroll horizontally for all columns"><table><caption className="sr-only">Posts with preview text, category, author, read time, views, and publication date. Select a row to view full details.</caption><thead><tr><th scope="col">Post</th><th scope="col">Preview</th><th scope="col">Category</th><th scope="col">Author</th><th scope="col">Read time</th><th scope="col">Views</th><th scope="col">Published</th></tr></thead><tbody>{posts.map((post) => <tr key={post.id} {...interactiveProps(post, onSelect)}><td className="table-id">{String(post.id).padStart(2, '0')}</td><td className="table-content"><Content post={post} /></td><td><span className={categoryClass(post.category)}>{post.category}</span></td><td><strong className="table-author">{post.author}</strong><span className="table-user">User {post.userId}</span></td><td>{post.readTime}</td><td>{formatViews(post.views)}</td><td>{post.date}</td></tr>)}</tbody></table></div>;
}
