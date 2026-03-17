import { NavLink } from 'react-router-dom';
import { navItems } from './navItems';

export function BottomNav() {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex justify-around">
        {navItems.map(({ to, shortLabel, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 text-xs font-medium transition-colors ${
                isActive
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`
            }
          >
            <Icon size={20} />
            <span className="mt-0.5">{shortLabel}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
