import Icon from './Icon';
export default function ViewSwitcher({ view, onChange }) { const options = [['card', 'Cards', 'grid'], ['list', 'List', 'list'], ['table', 'Table', 'table']]; return <div className="view-switch" role="radiogroup" aria-label="View mode">{options.map(([value, label, icon]) => <button className={view === value ? 'active' : ''} role="radio" aria-checked={view === value} key={value} onClick={() => onChange(value)}><Icon name={icon} size={16} /><span>{label}</span></button>)}</div>; }

