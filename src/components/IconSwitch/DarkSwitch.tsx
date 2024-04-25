"use client"
import { IconSunLow, IconMoonStars } from '@tabler/icons-react';
import { IconSwitch } from './IconSwitch';
import { useEffect, useState } from 'react';
import { useColorMode } from '@chakra-ui/react';

// export function useCurrentColorMode() {
//   const [state, setState] = useState('');
//   useEffect(() => {
//     if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//       setState('dark');
//     } else {
//       setState('light');
//     }
//   });
//   return state;
// }

// const useDark = function () {
//   useEffect(() => {
//     // On page load or when changing themes, best to add inline in `head` to avoid FOUC
//     if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//       onChange('dark');
//     } else {
//       onChange('light');
//     }
//     // Whenever the user explicitly chooses to respect the OS preference
//     // localStorage.removeItem('theme')
//   }, []);
//   const [value, setModeState] = useState<string>('');

//   const onChange = (mode: 'dark' | 'light') => {
//     setModeState(mode);
//     if (mode === 'dark') {
//       localStorage.theme = 'dark';
//       document.documentElement.setAttribute("data-theme", "dark");
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       document.documentElement.setAttribute("data-theme", "light");
//       localStorage.theme = 'light';
//     }
//   }
//   return { value, onChange };
// }

export function DarkSwitch({
  className
}: {
  className?: string
}) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconSwitch
      trueValue={'light'}
      falseValue={'dark'}
      className={className}
      trueIcon={<IconSunLow size={16} />}
      falseIcon={<IconMoonStars size={16} />}
      value={colorMode}
      onChange={toggleColorMode}
    />
  )
}