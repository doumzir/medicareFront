import { Languages } from 'lucide-react';
import { Link } from 'react-router';
import { useIsMobile } from '~/components/hooks/usemediaQuery';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '~/components/ui/navigation-menu';
import type { LangType } from '~/schema/langtype';
// Constante pour simuler l'état d'authentification (à modifier selon vos besoins)
const IS_AUTHENTICATED = true; // Changez cette valeur pour tester les différents états

// Composant mobile avec dropdown
export function NavBar({ lang }: { lang: LangType }) {
  const isMobile = useIsMobile();

  return (
    
    <nav className='bg-primary text-white '>
      <div className='relative flex items-center py-[13px] px-4 lg:px-5 max-w-[1440px] mx-auto'>
        <Link to={lang === 'en' ? '/fr' : '/en'}>
          <Languages className='size-6' />
        </Link>

        {/* Logo parfaitement centré */}
        <Link to='/' className='absolute left-1/2 transform -translate-x-1/2'>
          <img
            src='/app/images/logo.svg'
            alt='Medicar Logo'
            className='h-5 w-auto'
          />
        </Link>

        {/* Bouton de connexion ou dropdown utilisateur - poussé à droite */}

        <div className='ml-auto'>
          {IS_AUTHENTICATED ? (
            isMobile ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span className='font-medium text-sm'>Mon compte</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56' align='end'>
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Link to='/profile' className='flex items-center'>
                      <span>Profil</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link to='/dashboard' className='flex items-center'>
                      <span>Tableau de bord</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to='/settings' className='flex items-center'>
                      <span>Paramètres</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link to='/support' className='flex items-center'>
                      <span>Support</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to='/legal' className='flex items-center'>
                      <span>Mentions légales</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to='/privacy' className='flex items-center'>
                      <span>Politique de confidentialité</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to='/terms' className='flex items-center'>
                      <span>CGV</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link to='/logout'>Se déconnecter</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
                            
                                 
                <NavigationMenu className='text-base text-medium'>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        <span>Mon compte</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className='bg-white text-black text-sm p-0'>
                        <ul className='flex flex-col w-[400px] gap-3'>
                          <li>
                            <NavigationMenuLink className='p-0'>
                              <Link to='/profile' className='p-3 text-sm'>
                                Profil
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink className='p-0'>
                              <Link to='/dashboard' className='p-3 text-sm'>
                                Tableau de bord
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink className='p-0'>
                              <Link to='/dashboard' className='p-3 text-sm'>
                                Paramètres
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Menu Support */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        <span>Support</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className='bg-white text-black text-sm p-0'>
                        <ul className='flex flex-col w-[400px] gap-3  '>
                          <li>
                            <NavigationMenuLink className='p-0'>
                              <Link to='/contact' className='p-3 text-sm'>
                                Support
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink className='p-0'>
                              <Link to='/mentions-legales' className='p-3 text-sm'>
                                Mentions légales
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink className='p-0'>
                              <Link to='/politique-de-confidentialite' className='p-3 text-sm'>
                                Politique de confidentialité
                              </Link>
                            </NavigationMenuLink>
                                                      </li>
                                                      <li>
                            <NavigationMenuLink className='p-0'>
                              <Link to='/cgu' className='p-3 text-sm'>
                                CGU
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                                      </NavigationMenuList>
                                      <Link to='/logout' className='text-sm '>
                  <span>Se déconnecter</span>
                </Link>
                </NavigationMenu>

            
            )
          ) : (
            <Link
              className='text-white font-medium text-sm py-2 px-4 lg:py-2.5 lg:px-6 block'
              to='/login'
            >
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
