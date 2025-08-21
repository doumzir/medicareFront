
import { Form, redirect, useSearchParams } from 'react-router';
import { Section } from '~/components/ui/Section';
import { Title } from '~/components/ui/Title';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { registerSchema, tokenSchema } from '~/schema/auth.schema';

import type { Route } from './+types/register';
import { commitUserToken } from '~/session.server';
import { getAuthenticatedUser } from '~/auth.server';
export const loader = async ({ request }: Route.LoaderArgs) => {
  const user = await getAuthenticatedUser({ request });
  if(user) {
    return redirect('/dashboard');
  }
  return null;
};
export function meta() {
  return [
    { title: 'Inscription - Medicare' },
    {
      name: 'description',
      content:
        'Créez votre compte Medicare pour commencer à suivre votre santé',
    },
  ];
}

export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const rawData = Object.fromEntries(formData);
    
    // Transformer les données pour le schema
    const transformedData = {
        ...rawData,
        acceptTerms: rawData.acceptTerms === 'true', // Convertir string en boolean
        healthScore: rawData.healthScore ? Number(rawData.healthScore) : undefined
    };
    
    // console.log('Données transformées:', transformedData);
    const validatedData = registerSchema.parse(transformedData);
 
    // console.log({validatedData});
    const response = await fetch(process.env.BACKEND_URL + 'auth/register', {
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
   }) 
};

export default function Register() {
  const [searchParams] = useSearchParams();
  const healthScore = searchParams.get('healthScore');


  return (
    <Section>
      {healthScore  &&  (
       
          <p className='text-sm'>
            Votre note d’aujourd’hui est de {healthScore} / 10
          </p>
        
      )}
      <Title>Enregistrer ma note dans le temps</Title>
      <Form method='POST'>
        {healthScore && (
          <input type='hidden' name='healthScore' value={healthScore} />
        )}
        <Input type='email' name='email' placeholder='Email' />
        <Input type='text' name='lastName' placeholder='Nom' />
        <Input type='text' name='firstName' placeholder='Prenom' />
        <Input type='password' name='password' placeholder='Mot de passe' />
        <div className='flex items-start gap-3'>
          <Checkbox id='terms-2' name='acceptTerms' value="true" />
          <div className='grid gap-2'>
            <Label htmlFor='terms-2' className='text-sm font-medium'>
              J’accepte les termes et conditions d’utilisation
            </Label>
            <p className='text-[#71717A] text-sm'>
              J’ai lu et j’accepte les Conditions Générales d’Utilisation et la
              Politique de confidentialité. En cochant cette case, je reconnais
              avoir pris connaissance de l’ensemble des informations relatives
              au traitement de mes données personnelles et j’accepte sans
              réserve les conditions applicables.
            </p>
          </div>
        </div>
        <Button type='submit'>M’inscrire</Button>
      </Form>
    </Section>
  );
}
