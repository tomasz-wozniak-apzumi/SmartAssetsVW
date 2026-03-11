import { useState, useEffect } from 'react';

const SECRET_CODE = "tom123woz";

export function useAdminMode() {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  useEffect(() => {
    let typedKeys = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignoruj wpisywanie w pola tekstowe
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      typedKeys += e.key;
      
      // limituj bufor
      if (typedKeys.length > SECRET_CODE.length) {
        typedKeys = typedKeys.slice(1);
      }

      // jeśli wpisano konami code
      if (typedKeys === SECRET_CODE) {
        const newState = !isAdmin;
        setIsAdmin(newState);
        localStorage.setItem('isAdmin', String(newState));
        typedKeys = ''; // wyczyść bufor
        
        if (newState) {
          alert("Tryb Admina: WŁĄCZONY");
        } else {
          alert("Tryb Admina: WYŁĄCZONY");
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin]);

  return isAdmin;
}
