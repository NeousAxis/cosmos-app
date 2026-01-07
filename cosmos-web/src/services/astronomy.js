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
    const cycles = [];

    // On cherche les séquences : 1er Quartier -> Pleine Lune -> Dernier Q -> Nouvelle Lune
    // Le cycle Cosmos commence au 1er Quartier (Alignement)

    for (let i = 0; i < moonPhases.length - 4; i++) {
        const p1 = moonPhases[i]; // Potentiel 1er Quartier (Alignement)

        if (p1.type === 'First Quarter') {
            const p2 = moonPhases[i + 1]; // Pleine Lune (Contact)
            const p3 = moonPhases[i + 2]; // Dernier Quartier (Distribution)
            const p4 = moonPhases[i + 3]; // Nouvelle Lune (Intégration)
            const p5 = moonPhases[i + 4]; // Prochain 1er Quartier (Fin du cycle)

            if (!p2 || !p3 || !p4 || !p5) continue;

            // Identification du Signe : La Pleine Lune (p2) détermine le signe solaire
            // Le soleil change de signe vers le 20-22 du mois.
            // Si PL en Janvier -> Soleil Capricorne (jusqu'au 20) ou Verseau (après).
            // Règle simple : PL 22 Déc - 20 Jan = Capricorne.
            const plDate = p2.date;
            const signId = getZodiacSign(plDate);

            // Calcul des bornes (mi-chemin)
            const startAlignement = getMidpoint(moonPhases[i - 1]?.date || new Date(p1.date.getTime() - (7 * 24 * 3600 * 1000)), p1.date);
            // Note: pour le tout premier, on approxime si on n'a pas la phase d'avant, mais notre alg en a généré avant.

            // Logique de coupure (Cutoff)
            // Fin Alignement / Début Contact = Mi-chemin entre 1Q et PL
            const cut1 = getMidpoint(p1.date, p2.date);
            // Fin Contact / Début Distribution = Mi-chemin entre PL et DQ
            const cut2 = getMidpoint(p2.date, p3.date);
            // Fin Distribution / Début Intégration = Mi-chemin entre DQ et NL
            const cut3 = getMidpoint(p3.date, p4.date);
            // Fin Intégration = Mi-chemin entre NL et prochain 1Q
            const cut4 = getMidpoint(p4.date, p5.date);

            // Ajustement des dates (Start à 00:00, End chauchauche donc on met End à la veille ?)
            // Dans le calendrier fourni : Fin le 10, Début le 11. Donc pas de chevauchement.

            cycles.push({
                signId: signId,
                year: year,
                phases: [
                    { id: 'alignement', start: formatDate(p1.date.getTime() - (3.5 * 24 * 3600 * 1000)), end: formatDate(cut1) }, // Approx start for logic
                    { id: 'alignement_real', start: formatDate(getMidpoint(moonPhases[i - 1].date, p1.date, true)), end: formatDate(cut1) },

                    // On refait propre :
                    // Période définie par [Midpoint_Before, Midpoint_After]
                ]
            });
        }
    }

    // Refonte de la boucle pour format propre
    const cleanCycles = [];

    // On itère sur les moonPhases pour trouver les 1er Quartiers
    // On a besoin de la phase d'AVANT (NL) pour le début d'Alignement

    for (let i = 1; i < moonPhases.length - 1; i++) {
        const currentHook = moonPhases[i];

        // Si c'est un 1er Quartier, c'est le pivot de l'Alignement
        if (currentHook.type === 'First Quarter') {
            // Le "Cycle" complet est défini par cette séquence.
            // Il nous faut les phases p_prev (NL), p_curr (1Q), p_next (PL)
            const p_prev = moonPhases[i - 1]; // NL
            const p_curr = moonPhases[i];   // 1Q
            const p_next = moonPhases[i + 1]; // PL

            // Début Alignement = Midpoint(NL, 1Q) + 1 jour
            // Fin Alignement = Midpoint(1Q, PL)

            // Attendons, le tableau 2025 dit :
            // Alignement (4-10 Jan). 1Q le 7.
            // NL précedente (Dec 2024) était vers le 30.
            // 30 Dec -> 7 Jan = 8 jours. Midpoint = 3 ou 4 Jan.
            // Ca colle ! Alignement commence au midpoint NL-1Q.

            // C'est donc ça la règle universelle.
        }
    }

    return buildFinalCalendar(moonPhases);
}

function buildFinalCalendar(phases) {
    const finalRuns = [];

    for (let i = 1; i < phases.length - 4; i++) {
        if (phases[i].type === 'First Quarter') {
            const p_nl = phases[i - 1]; // Nouvelle
            const p_1q = phases[i];   // 1er Q (Alignement)
            const p_pl = phases[i + 1]; // Pleine (Contact)
            const p_dq = phases[i + 2]; // Dernier (Distribution)
            const p_nl2 = phases[i + 3]; // Nouvelle (Intégration)
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
                phases: [
                    { id: 'alignement', start: formatDateStr(startAlign), end: formatDateStr(endAlign) },
                    { id: 'contact', start: formatDateStr(startContact), end: formatDateStr(endContact) },
                    { id: 'distribution', start: formatDateStr(startDist), end: formatDateStr(endDist) },
                    { id: 'integration', start: formatDateStr(startInteg), end: formatDateStr(endInteg) }
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
    return new Date((t1 + t2) / 2);
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
