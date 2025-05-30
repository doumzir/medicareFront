import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

/**
 * Type strict pour l'utilisateur authentifié
 */
export type User = {
  id: string;
  role: "patient" | "medecin" | "admin";
};

/**
 * Type du contexte utilisateur
 */
export type UserContextType = {
  user: User | null;
  token: string | null;
  login: (userId: string, role: User["role"]) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Provider du contexte utilisateur
 * @param initialUser - Utilisateur initial (chargé côté serveur via loader)
 */
export function UserProvider({ children, initialUser }: { children: ReactNode; initialUser?: User | null }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Initialise l'utilisateur depuis le loader (SSR) ou les cookies (client)
  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    } else {
      const match = document.cookie.match(/auth_token=([^;]+)/);
      if (match) {
        setToken(match[1]);
        // Optionnel : fetch /me côté client si besoin
      }
    }
  }, [initialUser]);

  /**
   * Fonction de connexion : envoie userId et role au backend, stocke le token dans les cookies
   */
  const login = async (userId: string, role: User["role"]) => {
    setLoading(true);
    try {
      const res = await fetch("https://backendurl/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role }),
      });
      if (!res.ok) throw new Error("Erreur d'authentification");
      const data: { token: string; user: User } = await res.json();
      setToken(data.token);
      setUser(data.user);
      document.cookie = `auth_token=${data.token}; path=/; secure; samesite=strict`;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Déconnexion : supprime le token et l'utilisateur
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

/**
 * Hook pour accéder facilement au contexte utilisateur
 */
export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser doit être utilisé dans un UserProvider");
  return ctx;
} 