'use client';

import { useEffect, useState } from 'react';
import { Switch } from './switch';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const updateThemeColor = (color: string) => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    }
  };

  useEffect(() => {
    // Check if a theme is saved in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      // Default to light theme
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      updateThemeColor('#000'); // Dark theme background color
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      updateThemeColor('#fff'); // Light theme background color
    }
  }, [isDark]);

  return (
    <div className="flex items-center space-x-2 font-forma">
      <span className="text-sm text-gray-600 dark:text-gray-400 font-forma">День</span>
      <Switch
        checked={isDark}
        onCheckedChange={() => setIsDark(!isDark)}
        
        className="bg-gray-300 dark:bg-gray-700"
      />
      <span className="text-sm text-gray-600 dark:text-gray-400 font-forma">Ночь</span>
    </div>
  );
}