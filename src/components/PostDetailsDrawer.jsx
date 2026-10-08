import { useEffect } from 'react';
import Icon from './Icon';

const formatViews = (views) => views.toLocaleString('en-US');

export default function PostDetailsDrawer({ post, onClose }) {
  useEffect(() => {
    if (!post) return undefined;
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', handleKeyDown); };
  }, [post, onClose]);

  if (!post) return null;

  return <div className="drawer-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <aside className="details-drawer" role="dialog" aria-modal="true" aria-labelledby="post-detail-title">
      <div className="drawer-header"><span className="drawer-label">Article details</span><button className="drawer-close" onClick={onClose} aria-label="Close article details"><Icon name="close" size={18} /></button></div>
      <div className="drawer-content">
        <span className="category">{post.category}</span>
        <p className="drawer-post-id">Post {String(post.id).padStart(2, '0')}</p>
        <h2 id="post-detail-title">{post.title}</h2>
        <p className="drawer-excerpt">{post.excerpt}</p>
        <p className="drawer-body">{post.body}</p>
        <div className="drawer-meta">
          <div><span>Author</span><strong>{post.author}</strong></div>
          <div><span>Read time</span><strong>{post.readTime}</strong></div>
          <div><span>Views</span><strong>{formatViews(post.views)}</strong></div>
          <div><span>Published</span><strong>{post.date}</strong></div>
          <div><span>Post ID</span><strong>{post.id}</strong></div>
          <div><span>User ID</span><strong>{post.userId}</strong></div>
        </div>
      </div>
    </aside>
  </div>;
}
