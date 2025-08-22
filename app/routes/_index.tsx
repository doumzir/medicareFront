import { HeroHeader } from '~/components/HeroHeader';
import { Welcome } from '../welcome/welcome';
import type { Route } from './+types/home';

import { redirect } from 'react-router';
import { getAuthenticatedUser } from '~/auth.server';
export const loader = async ({ request }: Route.LoaderArgs) => {
  const user = await getAuthenticatedUser({ request });

  if(user) {
    return redirect('/dashboard');
  }
  return null;
};
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Medicare' },
    {
      name: 'description',
      content:
        'Medicare est une application de gestion de votre santé dans le temps',
    },
  ];
}

export default function Home() {
  return (
    <>
      <HeroHeader title='Prenez soin de vous' />
      <Welcome />
    </>
  );
}
