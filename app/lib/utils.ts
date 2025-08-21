import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Fonction pour vérifier si l'utilisateur est authentifié côté client
export function isUserAuthenticatedClient(): boolean {
  if (typeof document === 'undefined') {
    return false; // SSR
  }
  
  const cookies = document.cookie.split(';');
  const sessionCookie = cookies.find(cookie => 
    cookie.trim().startsWith('__session=')
  );
  
  return !!sessionCookie && sessionCookie.split('=')[1].trim() !== '';
}
