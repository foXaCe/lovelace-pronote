// Localization utility for Pronote cards

// Load translations
const TRANSLATIONS = {
  en: {
    "cards": {
      "timetable": { "name": "Pronote Timetable Card", "description": "Display the timetable from Pronote", "title": "Timetable of ", "no_data": "No timetable to display" },
      "homework": { "name": "Pronote Homework Card", "description": "Display the homework from Pronote", "title": "Homework of ", "no_data": "No homework" },
      "grades": { "name": "Pronote Grades Card", "description": "Display the grades from Pronote", "title": "Grades of ", "no_data": "No grades available" },
      "averages": { "name": "Pronote Averages Card", "description": "Display the averages from Pronote", "title": "Averages of ", "no_data": "No averages" },
      "evaluations": { "name": "Pronote Evaluations Card", "description": "Display the evaluations from Pronote", "title": "Evaluations of ", "no_data": "No evaluations to display" },
      "absences": { "name": "Pronote Absences Card", "description": "Display the absences from Pronote", "title": "Absences of ", "no_data": "No absences" },
      "delays": { "name": "Pronote Delays Card", "description": "Display the delays from Pronote", "title": "Delays of ", "no_data": "No delays" },
      "menus": { "name": "Pronote Menus Card", "description": "Display the menus from Pronote", "title": "Canteen menus of ", "no_data": "No menus to display" }
    },
    "editor": {
      "labels": { "all": "All", "current": "Current", "full": "Full", "short": "Short" },
      "fields": {
        "grade_format": "Grade format",
        "average_format": "Average format",
        "entity": "{card} entity",
        "display_header": "Display header",
        "display_description": "Display description",
        "display_teacher": "Display teacher",
        "display_date": "Display date",
        "display_comment": "Display comment",
        "display_coefficient": "Display coefficient",
        "max_evaluations": "Max evaluations",
        "hide_period_switch": "Hide period switch",
        "default_period": "Default period",
        "display_classroom": "Display classroom",
        "display_class_average": "Display class average",
        "display_class_min": "Display class min",
        "display_class_max": "Display class max",
        "compare_with_class_average": "Compare with class average",
        "compare_with_ratio": "Compare with ratio",
        "display_new_grade_notice": "Display new grade notice",
        "max_grades": "Max grades",
        "display_overall_average": "Display overall average",
        "average_format": "Average format",
        "display_labels": "Display labels",
        "display_menu_name": "Display menu name",
        "max_days": "Max days",
        "current_week_only": "Current week only",
        "switch_to_next_day": "Switch to next day",
        "enable_slider": "Enable slider",
        "display_lunch_break": "Display lunch break",
        "display_day_hours": "Display day hours",
        "dim_ended_lessons": "Dim ended lessons",
        "display_free_time_slots": "Display free time slots",
        "max_absences": "Max absences",
        "max_delays": "Max delays",
        "reduce_done_homework": "Reduce done homework",
        "display_done_homework": "Display done homework",
        "mapping_evaluations": "Mapping evaluations"
      }
    },
    "content": {
      "coefficient": "Coeff.",
      "class_average": "Avg.",
      "class_min": "Min.",
      "class_max": "Max.",
      "overall_average": "Overall average",
      "class_label": "Class",
      "lunch_break": "Lunch break",
      "classroom": "Room",
      "no_class": "No class",
      "hours_missed": "hours of class missed",
      "date_range_to": "to",
      "minutes_late": "minutes late",
      "all_periods": "All",
      "starter": "Starter",
      "main_course": "Main course",
      "side_dish": "Side dish",
      "cheese": "Cheese",
      "dessert": "Dessert"
    },
    "common": {
      "no_data": "No data", "loading": "Loading...", "error": "Error", "unavailable": "Data unavailable"
    }
  },
  fr: {
    "cards": {
      "timetable": { "name": "Carte Emploi du temps Pronote", "description": "Affiche l'emploi du temps depuis Pronote", "title": "Emploi du temps de ", "no_data": "Pas d'emploi du temps à afficher" },
      "homework": { "name": "Carte Devoirs Pronote", "description": "Affiche les devoirs depuis Pronote", "title": "Devoirs de ", "no_data": "Pas de devoirs à faire" },
      "grades": { "name": "Carte Notes Pronote", "description": "Affiche les notes depuis Pronote", "title": "Notes de ", "no_data": "Aucune note disponible" },
      "averages": { "name": "Carte Moyennes Pronote", "description": "Affiche les moyennes depuis Pronote", "title": "Moyennes de ", "no_data": "Aucune moyenne" },
      "evaluations": { "name": "Carte Évaluations Pronote", "description": "Affiche les évaluations depuis Pronote", "title": "Évaluations de ", "no_data": "Pas d'évaluation à afficher" },
      "absences": { "name": "Carte Absences Pronote", "description": "Affiche les absences depuis Pronote", "title": "Absences de ", "no_data": "Aucune absence" },
      "delays": { "name": "Carte Retards Pronote", "description": "Affiche les retards depuis Pronote", "title": "Retards de ", "no_data": "Aucun retard" },
      "menus": { "name": "Carte Menus Pronote", "description": "Affiche les menus depuis Pronote", "title": "Menus de la cantine de ", "no_data": "Pas de menus à afficher" }
    },
    "editor": {
      "labels": { "all": "Tous", "current": "Actuel", "full": "Complet", "short": "Court" },
      "fields": {
        "grade_format": "Format des notes",
        "average_format": "Format des moyennes",
        "entity": "Entité {card}",
        "display_header": "Afficher l'en-tête",
        "display_description": "Afficher la description",
        "display_teacher": "Afficher l'enseignant",
        "display_date": "Afficher la date",
        "display_comment": "Afficher le commentaire",
        "display_coefficient": "Afficher le coefficient",
        "max_evaluations": "Nombre max d'évaluations",
        "hide_period_switch": "Masquer le sélecteur de période",
        "default_period": "Période par défaut",
        "display_classroom": "Afficher la salle de classe",
        "display_class_average": "Afficher la moyenne de classe",
        "display_class_min": "Afficher le min de classe",
        "display_class_max": "Afficher le max de classe",
        "compare_with_class_average": "Comparer avec la moyenne de classe",
        "compare_with_ratio": "Comparer avec un ratio",
        "display_new_grade_notice": "Afficher l'indicateur de nouvelle note",
        "max_grades": "Nombre max de notes",
        "display_overall_average": "Afficher la moyenne générale",
        "average_format": "Format des moyennes",
        "display_labels": "Afficher les labels",
        "display_menu_name": "Afficher le nom du menu",
        "max_days": "Nombre max de jours",
        "current_week_only": "Semaine actuelle uniquement",
        "switch_to_next_day": "Passer au jour suivant automatiquement",
        "enable_slider": "Activer le slider",
        "display_lunch_break": "Afficher la pause déjeuner",
        "display_day_hours": "Afficher les heures de la journée",
        "dim_ended_lessons": "Atténuer les cours terminés",
        "display_free_time_slots": "Afficher les créneaux libres",
        "max_absences": "Nombre max d'absences",
        "max_delays": "Nombre max de retards",
        "reduce_done_homework": "Réduire les devoirs faits",
        "display_done_homework": "Afficher les devoirs faits",
        "mapping_evaluations": "Mapping des évaluations"
      }
    },
    "content": {
      "coefficient": "Coef.",
      "class_average": "Moy.",
      "class_min": "Min.",
      "class_max": "Max.",
      "overall_average": "Moyenne générale",
      "class_label": "Classe",
      "lunch_break": "Repas",
      "classroom": "Salle",
      "no_class": "Pas de cours",
      "hours_missed": "de cours manquées",
      "date_range_to": "au",
      "minutes_late": "minutes de retard",
      "all_periods": "Tout",
      "starter": "Entrée",
      "main_course": "Plat principal",
      "side_dish": "Accompagnement",
      "cheese": "Fromage",
      "dessert": "Dessert"
    },
    "common": {
      "no_data": "Aucune donnée", "loading": "Chargement...", "error": "Erreur", "unavailable": "Données non disponibles"
    }
  }
};

/**
 * Get nested value from object using dot notation
 * @param {Object} obj - The object to search
 * @param {string} path - Dot notation path (e.g., "cards.timetable.name")
 * @returns {string|undefined} - The value or undefined
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

/**
 * Create a localize function bound to a hass instance
 * @param {Object} hass - Home Assistant hass object
 * @returns {Function} Localize function
 */
export function createLocalizeFunction(hass) {
  const lang = hass?.language ||
               hass?.locale?.language ||
               (typeof navigator !== 'undefined' && navigator.language?.split('-')[0]) ||
               'en';

  const translations = TRANSLATIONS[lang] || TRANSLATIONS.en;

  /**
   * Translate a key using dot notation
   * @param {string} key - Dot notation key (e.g., "cards.timetable.name")
   * @param {string} fallback - Optional fallback string
   * @returns {string} Translated string or fallback or key
   */
  return function localize(key, fallback) {
    const value = getNestedValue(translations, key);

    if (value !== undefined) {
      return value;
    }

    // Try English fallback
    if (lang !== 'en') {
      const enValue = getNestedValue(TRANSLATIONS.en, key);
      if (enValue !== undefined) {
        return enValue;
      }
    }

    return fallback || key;
  };
}

// Auto-detect language from browser if hass not available
function detectLanguage() {
  if (typeof navigator !== 'undefined' && navigator.language) {
    const lang = navigator.language.split('-')[0];
    if (TRANSLATIONS[lang]) {
      return lang;
    }
  }
  return 'en';
}

// For backwards compatibility - global function with auto language detection
export function localize(key, fallback) {
  const lang = detectLanguage();
  const translations = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const value = getNestedValue(translations, key);

  if (value !== undefined) {
    return value;
  }

  // Try English fallback
  if (lang !== 'en') {
    const enValue = getNestedValue(TRANSLATIONS.en, key);
    if (enValue !== undefined) {
      return enValue;
    }
  }

  return fallback || key;
}

export default createLocalizeFunction;
