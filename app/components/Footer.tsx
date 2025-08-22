import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className='bg-gray-50 border-t border-gray-200'>
      <div className='max-w-[1440px] mx-auto px-4 lg:px-5 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Logo et description */}
          <div className='col-span-1 md:col-span-2'>
            <Link to='/' className='flex items-center mb-4'>
              <img
                src='/app/images/logo.svg'
                alt='Medicar Logo'
                className='h-8 w-auto'
              />
            </Link>
            <p className='text-gray-600 text-sm leading-relaxed'>
              Medicare est une application de gestion de votre santé dans le
              temps. Prenez soin de vous avec nos outils innovants.
            </p>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className='font-semibold text-gray-900 mb-4'>Liens utiles</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/profile'
                  className='text-gray-600 hover:text-primary text-sm'
                >
                  Mon profil
                </Link>
              </li>
              <li>
                <Link
                  to='/dashboard'
                  className='text-gray-600 hover:text-primary text-sm'
                >
                  Tableau de bord
                </Link>
              </li>
              <li>
                <Link
                  to='/contact'
                  className='text-gray-600 hover:text-primary text-sm'
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className='font-semibold text-gray-900 mb-4'>Légal</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/mentions-legales'
                  className='text-gray-600 hover:text-primary text-sm'
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  to='/politique-de-confidentialite'
                  className='text-gray-600 hover:text-primary text-sm'
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  to='/cgu'
                  className='text-gray-600 hover:text-primary text-sm'
                >
                  CGU
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className='border-t border-gray-200 mt-8 pt-6'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-500 text-sm'>
              © {new Date().getFullYear()} Medicare. Tous droits réservés.
            </p>
            <div className='flex space-x-4 mt-4 md:mt-0'>
              <Link
                to='/fr'
                className='text-gray-500 hover:text-primary text-sm'
              >
                Français
              </Link>
              <Link
                to='/en'
                className='text-gray-500 hover:text-primary text-sm'
              >
                English
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

