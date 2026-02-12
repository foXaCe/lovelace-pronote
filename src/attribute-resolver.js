/**
 * Attribute Resolver - Gère les deux conventions de nommage (anglais/français)
 * pour l'intégration Pronote
 */

// Mapping des attributs anglais -> français
const ATTRIBUTE_MAPPING = {
    // Attributs principaux
    'grades': 'notes',
    'homework': 'devoirs',
    'averages': 'moyennes',
    'absences': 'absences', // identique
    'delays': 'retards',
    'evaluations': 'evaluations', // identique
    'menus': 'menus', // identique
    'lessons': 'cours',
    'periods': 'periodes',
    'active_periods': 'periodes_actives',
    'nickname': 'surnom',
    'full_name': 'nom_complet',
    'period_key': 'cle_periode',
};

// Mapping des suffixes d'entités
const ENTITY_SUFFIX_MAPPING = {
    'grades': 'notes',
    'homework': 'devoirs',
    'averages': 'moyennes',
    'absences': 'absences',
    'delays': 'retards',
    'evaluations': 'evaluations',
    'menus': 'menus',
    'timetable': 'emploi_du_temps',
    'periods': 'periodes',
    'information_and_surveys': 'informations_et_sondages',
    'next_alarm': 'prochain_reveil',
    'punishments': 'punitions',
    'current_period': 'periode_en_cours',
    'active_periods': 'periodes_actives',
    'previous_periods': 'periodes_precedentes',
};

/**
 * Récupère un attribut en essayant d'abord la version anglaise, puis française
 * @param {Object} attributes - L'objet attributes du state
 * @param {string} key - La clé anglaise
 * @returns {*} La valeur de l'attribut ou undefined
 */
export function getAttribute(attributes, key) {
    if (!attributes) return undefined;

    // Essayer la version anglaise d'abord
    if (attributes[key] !== undefined) {
        return attributes[key];
    }

    // Essayer la version française
    const frenchKey = ATTRIBUTE_MAPPING[key];
    if (frenchKey && attributes[frenchKey] !== undefined) {
        return attributes[frenchKey];
    }

    return undefined;
}

/**
 * Vérifie si un attribut existe (anglais ou français)
 * @param {Object} attributes - L'objet attributes du state
 * @param {string} key - La clé anglaise
 * @returns {boolean}
 */
export function hasAttribute(attributes, key) {
    if (!attributes) return false;

    if (attributes[key] !== undefined) return true;

    const frenchKey = ATTRIBUTE_MAPPING[key];
    if (frenchKey && attributes[frenchKey] !== undefined) return true;

    return false;
}

/**
 * Détecte la langue utilisée par l'intégration
 * @param {Object} attributes - L'objet attributes d'une entité pronote
 * @returns {string} 'en' ou 'fr'
 */
export function detectLanguage(attributes) {
    if (!attributes) return 'en';

    // Si on trouve des attributs anglais typiques, c'est l'ancienne convention
    if (attributes.grades !== undefined || attributes.homework !== undefined || attributes.averages !== undefined) {
        return 'en';
    }

    // Si on trouve des attributs français, c'est la nouvelle convention
    if (attributes.notes !== undefined || attributes.devoirs !== undefined || attributes.moyennes !== undefined) {
        return 'fr';
    }

    // Par défaut, anglais
    return 'en';
}

/**
 * Résout le suffixe d'entité selon la convention détectée
 * @param {string} englishSuffix - Le suffixe anglais (ex: 'grades')
 * @param {string} entityId - L'ID de l'entité configurée (pour détection)
 * @returns {string} Le suffixe adapté
 */
export function resolveEntitySuffix(englishSuffix, entityId) {
    if (!entityId) return englishSuffix;

    // Détecter si l'entité utilise la convention française
    const frenchSuffix = ENTITY_SUFFIX_MAPPING[englishSuffix];

    if (frenchSuffix && entityId.includes(`_${frenchSuffix}`)) {
        return frenchSuffix;
    }

    return englishSuffix;
}

/**
 * Construit l'ID d'une entité liée en respectant la convention
 * @param {string} baseEntity - L'entité de base (ex: sensor.pronote_child_grades)
 * @param {string} targetEnglishSuffix - Le suffixe anglais souhaité
 * @returns {string} L'ID d'entité adapté
 */
export function buildRelatedEntityId(baseEntity, targetEnglishSuffix) {
    if (!baseEntity) return '';

    // Détecter quel suffixe est utilisé dans l'entité de base
    let basePrefix = null;
    let isFrench = false;

    for (const [en, fr] of Object.entries(ENTITY_SUFFIX_MAPPING)) {
        if (baseEntity.endsWith(`_${en}`)) {
            basePrefix = baseEntity.slice(0, -(en.length + 1));
            break;
        }
        if (en !== fr && baseEntity.endsWith(`_${fr}`)) {
            basePrefix = baseEntity.slice(0, -(fr.length + 1));
            isFrench = true;
            break;
        }
    }

    if (basePrefix === null) {
        // Fallback: retirer le dernier segment
        basePrefix = baseEntity.replace(/_[^_]+$/, '');
    }

    const targetSuffix = isFrench ? (ENTITY_SUFFIX_MAPPING[targetEnglishSuffix] || targetEnglishSuffix) : targetEnglishSuffix;

    return `${basePrefix}_${targetSuffix}`;
}

/**
 * Récupère tous les éléments d'un attribut tableau (grades, homework, etc.)
 * Gère la structure avec périodes
 * @param {Object} hass - L'objet hass
 * @param {string} entityId - L'ID de l'entité
 * @param {string} attributeKey - La clé anglaise de l'attribut
 * @returns {Array} Le tableau d'éléments
 */
export function getItemsFromEntity(hass, entityId, attributeKey) {
    if (!hass || !hass.states || !hass.states[entityId]) return [];

    const state = hass.states[entityId];
    const attributes = state.attributes;

    // Essayer d'abord l'attribut direct
    let items = getAttribute(attributes, attributeKey);
    if (Array.isArray(items)) {
        return items;
    }

    return [];
}

export default {
    getAttribute,
    hasAttribute,
    detectLanguage,
    resolveEntitySuffix,
    buildRelatedEntityId,
    getItemsFromEntity,
    ATTRIBUTE_MAPPING,
    ENTITY_SUFFIX_MAPPING,
};
