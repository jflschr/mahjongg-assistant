import { useState, useMemo, type ReactNode } from 'react';
import { RULES } from '../../data/rules';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';


function renderContent(text: string): ReactNode[] {
  return text.split('\n').map((line, li) => {
    const parts: ReactNode[] = [];
    let remaining = line;
    let key = 0;
    while (remaining.length > 0) {
      const boldStart = remaining.indexOf('**');
      if (boldStart === -1) {
        parts.push(remaining);
        break;
      }
      const boldEnd = remaining.indexOf('**', boldStart + 2);
      if (boldEnd === -1) {
        parts.push(remaining);
        break;
      }
      if (boldStart > 0) parts.push(remaining.slice(0, boldStart));
      parts.push(
        <strong key={key++} className="font-semibold text-gray-900 dark:text-gray-100">
          {remaining.slice(boldStart + 2, boldEnd)}
        </strong>
      );
      remaining = remaining.slice(boldEnd + 2);
    }
    return (
      <span key={li}>
        {parts}
        {li < text.split('\n').length - 1 && '\n'}
      </span>
    );
  });
}

export function RulesPage() {
  const [search, setSearch] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    if (!search.trim()) return RULES;
    const q = search.toLowerCase();
    return RULES.filter(
      (section) =>
        section.title.toLowerCase().includes(q) ||
        section.content.toLowerCase().includes(q) ||
        section.tags.some((t) => t.includes(q))
    );
  }, [search]);

  const toggleSection = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Auto-expand all when searching
  const isSearching = search.trim().length > 0;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">Rules Reference</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          American Mah Jongg rules and gameplay guide
        </p>
      </div>

      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search rules..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
          No rules found matching "{search}"
        </p>
      ) : (
        <div className="space-y-2">
          {filtered.map((section) => {
            const isExpanded = isSearching || expandedIds.has(section.id);
            return (
              <div
                key={section.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                    {section.title}
                  </span>
                  {isExpanded ? (
                    <ChevronDown size={16} className="text-gray-400 shrink-0" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-400 shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="mt-3 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                      {renderContent(section.content)}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {section.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
