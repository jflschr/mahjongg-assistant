import { useState, memo, useMemo } from 'react';
import { TileDisplay } from '../tiles/TileDisplay';
import type { TileCode, Suit } from '../../types/tile';
import clsx from 'clsx';

interface TileInputPanelProps {
  onAdd: (code: TileCode) => void;
  disabled?: boolean;
}

type Tab = Suit | 'honor' | 'special';

const TABS: { id: Tab; label: string; color: string }[] = [
  { id: 'crak', label: 'Crak', color: 'bg-red-600' },
  { id: 'dot', label: 'Dot', color: 'bg-blue-600' },
  { id: 'bam', label: 'Bam', color: 'bg-green-600' },
  { id: 'honor', label: 'Honor', color: 'bg-gray-600' },
  { id: 'special', label: 'Special', color: 'bg-yellow-600' },
];

function getCodesForTab(tab: Tab): TileCode[] {
  switch (tab) {
    case 'crak': return ['1c','2c','3c','4c','5c','6c','7c','8c','9c'];
    case 'dot': return ['1d','2d','3d','4d','5d','6d','7d','8d','9d'];
    case 'bam': return ['1b','2b','3b','4b','5b','6b','7b','8b','9b'];
    case 'honor': return ['wn','we','ww','ws','dr','dg','dw'];
    case 'special': return ['fl','jk'];
  }
}

export const TileInputPanel = memo(function TileInputPanel({ onAdd, disabled }: TileInputPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('crak');
  const codes = useMemo(() => getCodesForTab(activeTab), [activeTab]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex">
        {TABS.map(({ id, label, color }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={clsx(
              'flex-1 py-2 text-xs font-semibold transition-colors',
              activeTab === id
                ? `${color} text-white`
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="p-3 flex flex-wrap gap-2 justify-center">
        {codes.map((code) => (
          <TileDisplay
            key={code}
            code={code}
            size="lg"
            onClick={disabled ? undefined : () => onAdd(code)}
            dimmed={disabled}
          />
        ))}
      </div>
    </div>
  );
});
