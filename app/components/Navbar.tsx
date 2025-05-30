import { Bell, Calendar, FileText, LogIn, LogOut, Menu, Settings, User, X } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useUser } from "./UserContext";

// Couleurs principales (Doctolib)
const COLOR_PRIMARY = "#0E7ACA";
const COLOR_ACCENT = "#FFCD4D";

/**
 * Composant Navbar mobile-first, responsive, épuré, utilisant shadcn/ui
 * - Logo centré (mobile) ou à gauche (desktop)
 * - Sélecteur de langue à droite
 * - Menu burger (mobile) ou horizontal (desktop)
 * - Liens dynamiques selon l'état utilisateur
 */
export const Navbar: React.FC = () => {
  const { user, logout } = useUser();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { lang = "fr" } = useParams();
  const { t } = useTranslation();

  // Liens selon l'état utilisateur
  const links = user
    ? [
        { to: `/${lang}/dashboard`, label: t("nav.dashboard"), icon: <User size={18} /> },
        { to: `/${lang}/appointments`, label: t("nav.appointment"), icon: <Calendar size={18} /> },
        { to: `/${lang}/notes`, label: t("nav.notes"), icon: <FileText size={18} /> },
        { to: `/${lang}/reminders`, label: t("nav.reminders"), icon: <Bell size={18} /> },
        { to: `/${lang}/documents`, label: t("nav.documents"), icon: <FileText size={18} /> },
        { to: `/${lang}/settings`, label: t("nav.settings"), icon: <Settings size={18} /> },
      ]
    : [];

  return (
    <nav className="w-full border-b border-gray-200 bg-white dark:bg-gray-950 px-4 py-2 flex items-center justify-between sticky top-0 z-50">
      {/* Logo (mobile: centré, desktop: à gauche) */}
      <div className="flex-1 flex items-center">
        <Link to={`/${lang}`} className="mx-auto md:mx-0 block">
          {/* Remplace par ton logo SVG si besoin */}
          <span className="font-bold text-xl tracking-tight" style={{ color: COLOR_PRIMARY }}>
            Medicar
          </span>
        </Link>
      </div>
      {/* Menu desktop */}
      <div className="hidden md:flex gap-2 items-center">
        {user ? (
          <>
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <Button variant="ghost" size="sm" onClick={logout} className="flex items-center gap-1">
              <LogOut size={18} /> {t("nav.logout")}
            </Button>
          </>
        ) : (
          <Link to={`/${lang}/login`} className="flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium">
            <LogIn size={18} /> {t("nav.login")}
          </Link>
        )}
        {/* Sélecteur de langue */}
        <LangSelect />
      </div>
      {/* Menu burger mobile */}
      <div className="md:hidden flex items-center gap-2">
        <LangSelect />
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Ouvrir le menu">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {user ? (
              <>
                {links.map((link) => (
                  <DropdownMenuItem asChild key={link.to}>
                    <Link to={link.to} className="flex items-center gap-2">
                      {link.icon}
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={logout} className="flex items-center gap-2">
                  <LogOut size={18} /> {t("nav.logout")}
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem asChild>
                <Link to={`/${lang}/login`} className="flex items-center gap-2">
                  <LogIn size={18} /> {t("nav.login")}
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

/**
 * Sélecteur de langue qui route proprement vers /fr/ ou /en/
 */
const LangSelect: React.FC = () => {
  const { lang = "fr" } = useParams();
  const navigate = useNavigate();
  return (
    <select
      value={lang}
      onChange={(e) => navigate(`/${e.target.value}`)}
      className="ml-2 px-2 py-1 rounded border border-gray-300 text-sm bg-white dark:bg-gray-900"
      aria-label="Changer de langue"
    >
      <option value="fr">Français</option>
      <option value="en">English</option>
    </select>
  );
}; 