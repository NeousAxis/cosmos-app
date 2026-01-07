/**
 * Moteur de calcul astronomique pour le calendrier Cosmos
 * Calcule les phases lunaires et génère les périodes (Alignement, Contact, etc.)
 */

// Durée moyenne d'une lunaison en ms
const SYNODIC_MONTH = 29.53058867 * 24 * 60 * 60 * 1000;

// Une date de référence pour la Nouvelle Lune (New Moon)
// 11 Janvier 2024 à 11:57 UTC
const BASE_NEW_MOON = new Date('2024-01-11T11:57:00Z').getTime();

/**
 * Retourne la phase lunaire approximative (0-1) pour une date
 * 0 = Nouvelle Lune, 0.25 = 1er Quartier, 0.5 = Pleine Lune, 0.75 = Dernier Quartier
 */
function getMoonPhaseInternal(date) {
    const diff = date.getTime() - BASE_NEW_MOON;
    const phases = diff / SYNODIC_MONTH;
    const currentPhase = phases - Math.floor(phases);
    return currentPhase;
}

/**
 * Retourne la tendance lunaire (Croissant ou Décroissant)
 */
export function getMoonTrend(date = new Date()) {
    const phase = getMoonPhaseInternal(date);
    // 0.0 - 0.5 = Croissant (Waxing)
    // 0.5 - 1.0 = Décroissant (Waning)
    return phase < 0.5 ? 'Croissant' : 'Décroissant';
}

/**
 * Trouve les dates précises des 4 phases majeures pour une année donnée
 * Algorithme simplifié de recherche de pics
 */
function getPhasesForYear(year) {
    const phases = [];
    let date = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 15); // Un peu de marge pour le début de l'année suivante

    // On scanne jour par jour (optimisation possible mais suffisant ici)
    // Pour plus de précision, on utiliserait une librairie astro, mais on reste sans dépendance.

    // Simplification : on génère les phases basées sur le cycle moyen
    // Pour un calendrier pro, idéalement on injecterait les vraies éphémérides,
    // mais le cycle moyen est correct à +/- 1 jour.

    // On cherche la première Nouvelle Lune de l'année (ou fin d'année d'avant)
    let t = BASE_NEW_MOON;
    while (t < new Date(year - 1, 11, 20).getTime()) {
        t += SYNODIC_MONTH;
    }

    // On génère la suite
    while (t < endDate.getTime()) {
        // Nouvelle Lune
        phases.push({ date: new Date(t), type: 'New Moon' });
        // 1er Quartier
        auth_approx(phases, t + (SYNODIC_MONTH * 0.25), 'First Quarter');
        // Pleine Lune
        auth_approx(phases, t + (SYNODIC_MONTH * 0.5), 'Full Moon');
        // Dernier Quartier
        auth_approx(phases, t + (SYNODIC_MONTH * 0.75), 'Last Quarter');

        t += SYNODIC_MONTH;
    }

    return phases.sort((a, b) => a.date - b.date);
}

function auth_approx(list, time, type) {
    list.push({ date: new Date(time), type });
}

/**
 * GÉNÉRATEUR DE CALENDRIER COSMOS
 * Applique la règle : Coupure à mi-chemin entre les phases
 */
export function generateCosmosCalendar(year) {
    const moonPhases = getPhasesForYear(year);
    // On délègue la construction finale à la fonction dédiée qui gère les pics et les périodes
    return buildFinalCalendar(moonPhases);
}

function buildFinalCalendar(phases) {
    const finalRuns = [];

    for (let i = 1; i < phases.length - 4; i++) {
        if (phases[i].type === 'First Quarter') {
            const p_nl = phases[i - 1]; // Nouvelle (Previous)
            const p_1q = phases[i];   // 1er Q (Alignement Peak)
            const p_pl = phases[i + 1]; // Pleine (Contact Peak)
            const p_dq = phases[i + 2]; // Dernier (Distribution Peak)
            const p_nl2 = phases[i + 3]; // Nouvelle (Intégration Peak)
            const p_1q2 = phases[i + 4]; // Prochain 1Q (Next cycle)

            // Calcul des cutoffs
            const startAlign = addDays(getMidpointDate(p_nl.date, p_1q.date), 1);
            const endAlign = getMidpointDate(p_1q.date, p_pl.date);

            const startContact = addDays(endAlign, 1);
            const endContact = getMidpointDate(p_pl.date, p_dq.date);

            const startDist = addDays(endContact, 1);
            const endDist = getMidpointDate(p_dq.date, p_nl2.date);

            const startInteg = addDays(endDist, 1);
            const endInteg = getMidpointDate(p_nl2.date, p_1q2.date);

            // Identification Signe (Soleil lors de la PL)
            const sign = getZodiacSign(p_pl.date);

            finalRuns.push({
                signId: sign,
                year: p_pl.date.getFullYear(), // Reference Year
                phases: [
                    { id: 'alignement', start: formatDateStr(startAlign), end: formatDateStr(endAlign), peak: formatDateStr(p_1q.date) },
                    { id: 'contact', start: formatDateStr(startContact), end: formatDateStr(endContact), peak: formatDateStr(p_pl.date) },
                    { id: 'distribution', start: formatDateStr(startDist), end: formatDateStr(endDist), peak: formatDateStr(p_dq.date) },
                    { id: 'integration', start: formatDateStr(startInteg), end: formatDateStr(endInteg), peak: formatDateStr(p_nl2.date) }
                ]
            });
        }
    }
    return finalRuns;
}

// Utilitaires
function getMidpointDate(d1, d2) {
    const t1 = d1.getTime();
    const t2 = d2.getTime();
    // Bias backwards by 18 hours to ensure cutoffs align with user preference (Strictly earlier)
    return new Date((t1 + t2) / 2 - (18 * 60 * 60 * 1000));
}

function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

function formatDateStr(date) {
    return date.toISOString().split('T')[0];
}

function getZodiacSign(date) {
    // Estimation simplifiée du signe solaire basé sur le jour de l'année
    // Suffisant pour lier au cycle
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month == 1 && day <= 19) || (month == 12 && day >= 22)) return 'capricorn';
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return 'aquarius';
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return 'pisces';
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return 'aries';
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return 'taurus';
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return 'gemini';
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return 'cancer';
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return 'leo';
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return 'virgo';
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return 'libra';
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return 'scorpio';
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return 'sagittarius';
    return 'capricorn';
}
