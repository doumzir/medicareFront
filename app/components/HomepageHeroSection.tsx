import { fr } from "date-fns/locale";
import { Calendar } from "lucide-react";
import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

/**
 * Composant HeroSection de la page d'accueil
 * - Titre "Prenez soin de vous" avec effet SVG sur "vous"
 * - Inputs : traitement (texte), date (datepicker), bouton Commencer
 * - Mobile : colonne, Desktop : ligne
 * - Couleurs Doctolib
 */
export const HomepageHeroSection: React.FC = () => {
  const [traitement, setTraitement] = React.useState("");
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const { t } = useTranslation("common");

  // Soumission du formulaire 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: action réelle
    alert(`${t("hero.input.treatment")}: ${traitement}\n${t("hero.input.date")}: ${date?.toLocaleDateString("fr-FR") ?? ""}`);
  };

  return (
    <section className="w-full flex flex-col items-center justify-center py-10 px-4 bg-white ">
    
      <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-8 leading-tight text-primary">
        {t("hero.title")}
      </h1>
      
      <form
        className="flex flex-col md:flex-row gap-4 w-full max-w-2xl items-stretch justify-center"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          placeholder={t("hero.input.treatment")}
          value={traitement}
          onChange={(e) => setTraitement(e.target.value)}
          className="flex-1 min-w-0"
          required
        />
        <div className="relative flex-1 min-w-0">
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-between text-primary border-primary"
            onClick={() => setShowCalendar((v) => !v)}
            aria-label={t("hero.input.date")}
          >
            <span>{date ? date.toLocaleDateString("fr-FR") : t("hero.input.date")}</span>
            <Calendar size={18} className="ml-2" />
          </Button>
          {showCalendar && (
            <div className="absolute z-20 bg-white dark:bg-gray-900 rounded shadow-lg mt-2 left-0 border border-primary">
              <DayPicker
                mode="single"
                selected={date}
                onSelect={(d) => {
                  setDate(d);
                  setShowCalendar(false);
                }}
                locale={fr}
                styles={{}}
              />
            </div>
          )}
        </div>
        <Button
          type="submit"
          className="flex-1 min-w-0 bg-primary hover:bg-primary/80 text-white font-bold"
        >
          {t("hero.button.start")}
        </Button>
      </form>
    </section>
  );
}; 