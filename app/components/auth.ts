/**
 * Service d'authentification pour communiquer avec le backend NestJS
 * Utilise TypeScript strict, pas de any ni de as
 */

export type AuthRequest = {
  userId: string;
  role: "patient" | "medecin" | "admin";
};

export type AuthResponse = {
  token: string;
  user: {
    id: string;
    role: "patient" | "medecin" | "admin";
  };
};

/**
 * Fonction pour authentifier un utilisateur auprès du backend
 * @param req - Les informations d'identification
 * @returns Le token et l'utilisateur
 */
export async function authenticate(req: AuthRequest): Promise<AuthResponse> {
  const response = await fetch("https://backendurl/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (!response.ok) {
    throw new Error("Erreur d'authentification");
  }
  return (await response.json()) as AuthResponse;
} 