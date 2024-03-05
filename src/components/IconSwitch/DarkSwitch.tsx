import { IconSunLow, IconMoonStars } from '@tabler/icons-react';
import { IconSwitch } from './IconSwitch';
import { useEffect, useState } from 'react';

const useDark = function () {
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      onChange('dark');
    } else {
      onChange('light');
    }
    // Whenever the user explicitly chooses to respect the OS preference
    // localStorage.removeItem('theme')
  }, []);
  const [value, setModeState] = useState<string>('');

  const onChange = (mode: 'dark' | 'light') => {
    setModeState(mode);
    if (mode === 'dark') {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }
  return { value, onChange };
}

export function DarkSwitch({
  className
}: {
  className: string
}) {
  const { value, onChange } = useDark();
  return (
    <IconSwitch
      trueValue={'light'}
      falseValue={'dark'}
      className={className}
      trueIcon={<IconSunLow size={16} />}
      falseIcon={<IconMoonStars size={16} />}
      value={value}
      onChange={onChange}
    />
  )
}