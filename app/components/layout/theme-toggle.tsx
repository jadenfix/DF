'use client';

import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Bars3Icon, XMarkIcon, UserCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';

export { Bars3Icon, XMarkIcon, UserCircleIcon, SparklesIcon };

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      aria-label="Toggle theme"
    >
      <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute inset-2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
} 