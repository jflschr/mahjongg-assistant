import { useState } from 'react';
import { CARD_2025 } from '../../data/card';
import { HandCard } from './HandCard';
import clsx from 'clsx';

export function CardViewerPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = CARD_2025.categories;

  const displayedCategories = activeCategory
    ? categories.filter((c) => c.id === activeCategory)
    : categories;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
          {CARD_2025.year} Card
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Official NMJL card hands for reference.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setActiveCategory(null)}
          className={clsx(
            'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
            !activeCategory
              ? 'bg-emerald-700 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
            className={clsx(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
              cat.id === activeCategory
                ? 'bg-emerald-700 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {displayedCategories.map((cat) => (
        <div key={cat.id}>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2 uppercase tracking-wide">
            {cat.name}
          </h3>
          <div className="space-y-3">
            {cat.hands.map((hand) => (
              <HandCard key={hand.id} hand={hand} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
