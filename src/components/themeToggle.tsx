'use client';

import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

 
useEffect(() => {
  const stored = localStorage.getItem('theme');
  const shouldUseDark = stored === 'dark'; 
  document.documentElement.classList.toggle('dark', shouldUseDark);
  setIsDark(shouldUseDark);
}, []);


  const toggleTheme = (checked: boolean) => {
    setIsDark(checked);
    localStorage.setItem('theme', checked ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', checked);
  };

  return (
    <div className="flex items-center gap-2   transition-colors duration-300">
      <span className="text-sm">🌞</span>
      <Switch checked={isDark} onCheckedChange={toggleTheme} />
      <span className="text-sm">🌙</span>
    </div>
  );
}
