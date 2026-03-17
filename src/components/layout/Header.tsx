import { NavLink } from 'react-router-dom';
import { Sun, Moon, Contrast } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';
import { navItems } from './navItems';

export function Header() {
  const { theme, setTheme } = useThemeStore();

  const cycleTheme = () => {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(next);
  };

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Contrast;

  return (
    <header className="bg-emerald-800 dark:bg-emerald-950 text-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold tracking-tight">Mah Jongg Assistant</h1>
        <div className="flex items-center gap-2">
          <nav className="hidden sm:flex gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-700 text-white'
                      : 'text-emerald-100 hover:bg-emerald-700/50'
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>
          <button
            onClick={cycleTheme}
            className="p-1.5 rounded-md text-emerald-100 hover:bg-emerald-700/50 transition-colors"
            title={`Theme: ${theme}`}
          >
            <ThemeIcon size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
