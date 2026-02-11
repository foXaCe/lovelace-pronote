// Localization utility for Pronote cards

// Load translations
const TRANSLATIONS = {
  en: {
    "cards": {
      "timetable": { "name": "Pronote Timetable Card", "description": "Display the timetable from Pronote" },
      "homework": { "name": "Pronote Homework Card", "description": "Display the homework from Pronote" },
      "grades": { "name": "Pronote Grades Card", "description": "Display the grades from Pronote" },
      "averages": { "name": "Pronote Averages Card", "description": "Display the averages from Pronote" },
      "evaluations": { "name": "Pronote Evaluations Card", "description": "Display the evaluations from Pronote" },
      "absences": { "name": "Pronote Absences Card", "description": "Display the absences from Pronote" },
      "delays": { "name": "Pronote Delays Card", "description": "Display the delays from Pronote" },
      "menus": { "name": "Pronote Menus Card", "description": "Display the menus from Pronote" }
    },
    "editor": {
      "labels": { "all": "All", "current": "Current", "full": "Full", "short": "Short" },
      "fields": { "grade_format": "Grade format", "average_format": "Average format" }
    },
    "common": {
      "no_data": "No data", "loading": "Loading...", "error": "Error"
    }
  },
  fr: {
    "cards": {
      "timetable": { "name": "Carte Emploi du temps Pronote", "description": "Affiche l'emploi du temps depuis Pronote" },
      "homework": { "name": "Carte Devoirs Pronote", "description": "Affiche les devoirs depuis Pronote" },
      "grades": { "name": "Carte Notes Pronote", "description": "Affiche les notes depuis Pronote" },
      "averages": { "name": "Carte Moyennes Pronote", "description": "Affiche les moyennes depuis Pronote" },
      "evaluations": { "name": "Carte Évaluations Pronote", "description": "Affiche les évaluations depuis Pronote" },
      "absences": { "name": "Carte Absences Pronote", "description": "Affiche les absences depuis Pronote" },
      "delays": { "name": "Carte Retards Pronote", "description": "Affiche les retards depuis Pronote" },
      "menus": { "name": "Carte Menus Pronote", "description": "Affiche les menus depuis Pronote" }
    },
    "editor": {
      "labels": { "all": "Tous", "current": "Actuel", "full": "Complet", "short": "Court" },
      "fields": { "grade_format": "Format des notes", "average_format": "Format des moyennes" }
    },
    "common": {
      "no_data": "Aucune donnée", "loading": "Chargement...", "error": "Erreur"
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

// For backwards compatibility - global function
export function localize(key, fallback, hass) {
  const localizeFn = createLocalizeFunction(hass);
  return localizeFn(key, fallback);
}

export default createLocalizeFunction;
