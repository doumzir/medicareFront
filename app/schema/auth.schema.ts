import { z } from 'zod';
export const passwordSchema =  z.string().min(8, { message: 'Mot de passe trop court' }).superRefine((val, ctx) => { 
  if (!/[A-Z]/.test(val)) {
      ctx.addIssue({
          code: "custom",
          message: 'Mot de passe doit contenir au moins une lettre majuscule',
      });
  }
  if (!/[a-z]/.test(val)) {
      ctx.addIssue({
          code: "custom",
          message: 'Mot de passe doit contenir au moins une lettre minuscule',
      });
  }
  if (!/[0-9]/.test(val)) {
      ctx.addIssue({
          code: "custom",
          message: 'Mot de passe doit contenir au moins un chiffre',
      });
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g.test(val)) {
      ctx.addIssue({ 
          code: "custom",
          message: 'Mot de passe doit contenir au moins un caractère spécial',
      });
  }
})
export const registerSchema = z.object({
  email: z.email({message: 'Email invalide'}),
  password: passwordSchema,
  lastName: z.string().min(1, {message: 'Nom invalide'}),
    firstName: z.string().min(1, { message: 'Prenom invalide' }),
  acceptTerms: z.boolean().refine((val) => val, {
    message: 'Vous devez accepter les termes et conditions',
  }),
  healthScore: z.number().min(0).max(10).optional(),
});
export const tokenSchema = z.object({
  access_token: z.string(),
});
export const loginSchema = z.object({
  email: z.email({message: 'Email invalide'}),
  password: passwordSchema,
});
export const getAuthenticatedUserSchema = z.object({
 email: z.email({ message: 'Email invalide' }),
  id: z.string(),
  firstName: z.string(),
});
