import Icon from './Icon';

export default function Header({ theme, onToggleTheme, libraryOpen, onToggleLibrary }) {
  return (
    <header className="topbar">
      <div className="brand" aria-label="Post Explorer">
        post<span className="brand-light">explorer</span><span className="brand-dot">.</span>
      </div>
      
      <button className="library-toggle" onClick={onToggleLibrary} aria-expanded={libraryOpen} aria-controls="library-panel">
        <Icon name="table" size={18} />
        <span>Your library</span>
      </button>
      
      <span className="header-caption">Good ideas deserve a little space.</span>
      
      <button className="theme-button" onClick={onToggleTheme}>
        <Icon name={theme === 'light' ? 'moon' : 'sun'} size={18} />
        <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
      </button>
    </header>
  );
}