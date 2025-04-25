import { useState, useEffect } from 'react';

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    // Prova a leggere le preferenze del sistema operativo come prima scelta
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Usa il tema salvato, o quello del sistema, o 'light' come fallback
    return storedTheme || (prefersDark ? 'dark' : 'light');
  });

  useEffect(() => {
    const body = window.document.body;
    if (theme === 'dark') {
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    // Opzionale: ascolta i cambiamenti delle preferenze di sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
        // Cambia solo se l'utente non ha già scelto manualmente un tema (controllando localStorage)
        if (!localStorage.getItem('theme')) {
             setTheme(e.matches ? 'dark' : 'light');
        }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);

  }, [theme]); // Riesegui l'effetto quando 'theme' cambia

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return [theme, toggleTheme];
}

export default useTheme;