import { Form, Link, redirect } from 'react-router';
import { Section } from '~/components/ui/Section';
import { Title } from '~/components/ui/Title';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { loginSchema, tokenSchema } from '~/schema/auth.schema';

import { getAuthenticatedUser } from '~/auth.server';
import { commitUserToken } from '~/session.server';
import type { Route } from './+types/login';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const user = await getAuthenticatedUser({ request });
  if(user) {
    return redirect('/dashboard');
  }
  return null;
};

export function meta() {
  return [
    { title: 'Connexion - Medicare' },
    {
      name: 'description',
      content: 'Connectez-vous à votre compte Medicare pour accéder à votre tableau de bord',
    },
  ];
}

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);
  
  const validatedData = loginSchema.parse(rawData);

  const response = await fetch(process.env.BACKEND_URL + 'auth/login', {
    method: 'POST',
    body: JSON.stringify(validatedData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const {access_token} = tokenSchema.parse(await response.json());
  
  return redirect('/dashboard', {
    headers: {
      'Set-Cookie': await commitUserToken({request, token: access_token})
    }
  });
};

export default function Login() {
  return (
    <Section>
      <Title>Se connecter</Title>
      <Form method='POST' className="space-y-4">
        <Input 
          type='email' 
          name='email' 
          placeholder='Email' 
          required 
        />
        <Input 
          type='password' 
          name='password' 
          placeholder='Mot de passe' 
          required 
        />
        <Button type='submit' className="w-full">
          Se connecter
        </Button>
      </Form>
      
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          Vous n&apos;avez pas de compte ?{' '}
          <Link 
            to="/register" 
            className="text-primary hover:underline font-medium"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </Section>
  );
}