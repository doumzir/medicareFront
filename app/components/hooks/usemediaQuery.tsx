import { useEffect, useState } from 'react';

/**
 * Hook personnalisé pour écouter les changements de requêtes média CSS
 * @param query - La requête média CSS (ex: "(max-width: 768px)")
 * @returns boolean - true si la requête média est actuellement active
 */
export function useMediaQuery(query: string): boolean {
  // État pour stocker si la requête média correspond
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Vérifier si nous sommes côté client (pour éviter les erreurs SSR)
    if (typeof window === 'undefined') {
      return;
    }

    // Créer l'objet MediaQueryList
    const mediaQueryList = window.matchMedia(query);

    // Fonction pour mettre à jour l'état
    const updateMatches = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Définir l'état initial
    setMatches(mediaQueryList.matches);

    // Ajouter l'écouteur d'événements
    mediaQueryList.addEventListener('change', updateMatches);

    // Fonction de nettoyage
    return () => {
      mediaQueryList.removeEventListener('change', updateMatches);
    };
  }, [query]);

  return matches;
}

// Hooks pré-configurés pour les breakpoints courants
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet = () =>
  useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)');
export const useIsDarkMode = () =>
  useMediaQuery('(prefers-color-scheme: dark)');
export const useReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)');
