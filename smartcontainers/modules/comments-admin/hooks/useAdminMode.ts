import { useState, useEffect } from 'react';

// ============================================================
// comments-admin module — useAdminMode
//
// Aktywacja trybu admina: wpisz SECRET_CODE poza polami input/textarea.
// Domyślny kod: "tom123woz"
// Stan jest persystowany w localStorage pod kluczem 'comments_admin_mode'.
// ============================================================

const SECRET_CODE = 'tom123woz';

export function useAdminMode(): boolean {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('comments_admin_mode') === 'true';
  });

  useEffect(() => {
    let typedKeys = '';

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignoruj wpisywanie w pola tekstowe
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      typedKeys += e.key;

      // Ogranicz bufor do długości kodu
      if (typedKeys.length > SECRET_CODE.length) {
        typedKeys = typedKeys.slice(-SECRET_CODE.length);
      }

      if (typedKeys === SECRET_CODE) {
        const newState = !isAdmin;
        setIsAdmin(newState);
        localStorage.setItem('comments_admin_mode', String(newState));
        typedKeys = '';

        if (newState) {
          alert('Tryb Admina: WŁĄCZONY');
        } else {
          alert('Tryb Admina: WYŁĄCZONY');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin]);

  return isAdmin;
}
