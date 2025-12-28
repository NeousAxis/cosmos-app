
const fs = require('fs');

// --- MOTEUR ASTRO (Intégré) ---
const SYNODIC_MONTH = 29.53058867 * 24 * 60 * 60 * 1000;
const BASE_NEW_MOON = new Date('2024-01-11T11:57:00Z').getTime();

function getPhasesForYear(year) {
    const phases = [];
    const endDate = new Date(year + 1, 0, 15);
    let t = BASE_NEW_MOON;
    // Remonter assez loin pour attraper le début de l'année
    while (t > new Date(year, 0, 1).getTime() - SYNODIC_MONTH * 2) {
        t -= SYNODIC_MONTH;
    }
    // Avancer jusqu'au point de départ
    while (t < new Date(year - 1, 10, 1).getTime()) {
        t += SYNODIC_MONTH;
    }

    while (t < endDate.getTime()) {
        phases.push({ date: new Date(t), type: 'New Moon' });
        phases.push({ date: new Date(t + (SYNODIC_MONTH * 0.25)), type: 'First Quarter' });
        phases.push({ date: new Date(t + (SYNODIC_MONTH * 0.5)), type: 'Full Moon' });
        phases.push({ date: new Date(t + (SYNODIC_MONTH * 0.75)), type: 'Last Quarter' });
        t += SYNODIC_MONTH;
    }
    return phases.sort((a, b) => a.date - b.date);
}

function getMidpoint(d1, d2) {
    const t1 = d1.getTime();
    const t2 = d2.getTime();
    return new Date((t1 + t2) / 2);
}

function formatDateStr(date) {
    return date.toISOString().split('T')[0];
}

function getZodiacSign(date) {
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

function generateStats(year) {
    const moonPhases = getPhasesForYear(year);
    const finalRuns = [];

    // On itère pour trouver les cycles commençant par 1er Quartier
    for (let i = 1; i < moonPhases.length - 5; i++) {
        if (moonPhases[i].type === 'First Quarter') {
            const p_nl = moonPhases[i - 1];
            const p_1q = moonPhases[i];
            const p_pl = moonPhases[i + 1];
            const p_dq = moonPhases[i + 2];
            const p_nl2 = moonPhases[i + 3];
            const p_1q2 = moonPhases[i + 4];

            // Calculer les dates de coupure (Cutoff)
            // Start Align = (NL + 1Q)/2 + 1 jour
            const midpoint_nl_1q = getMidpoint(p_nl.date, p_1q.date);
            const startAlign = new Date(midpoint_nl_1q);
            startAlign.setDate(startAlign.getDate() + 1);

            // End Align = (1Q + PL)/2
            const endAlign = getMidpoint(p_1q.date, p_pl.date);

            // Start Contact = End Align + 1 jour
            const startContact = new Date(endAlign);
            startContact.setDate(startContact.getDate() + 1);

            const endContact = getMidpoint(p_pl.date, p_dq.date);

            const startDist = new Date(endContact);
            startDist.setDate(startDist.getDate() + 1);

            const endDist = getMidpoint(p_dq.date, p_nl2.date);

            const startInteg = new Date(endDist);
            startInteg.setDate(startInteg.getDate() + 1);

            const endInteg = getMidpoint(p_nl2.date, p_1q2.date);

            // Signe déterminé par la Pleine Lune
            const sign = getZodiacSign(p_pl.date);

            finalRuns.push({
                signId: sign,
                year: year,
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

// --- MAIN ---
const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
let fullData = [];

years.forEach(y => {
    fullData = [...fullData, ...generateStats(y)];
});

// Remove duplicates if overlapping years produced same cycles
const uniqueData = fullData.filter((v, i, a) => a.findIndex(t => (t.signId === v.signId && t.phases[0].start === v.phases[0].start)) === i);

const fileContent = `/**
 * CALENDRIER COSMOS AUTOMATIQUE (2025-2030)
 * Généré le ${new Date().toISOString()}
 * Basé sur les phases lunaires astronomiques.
 */
export const CALENDAR = ${JSON.stringify(uniqueData, null, 2)};

export const getPhaseForDate = (date = new Date()) => {
  const d = new Date(date);
  // Ajuster pour ignorer l'heure (comparaison String YYYY-MM-DD)
  // Utiliser l'heure locale pour s'assurer qu'on est au bon jour
  const offset = d.getTimezoneOffset() * 60000;
  const localDate = new Date(d.getTime() - offset).toISOString().split('T')[0];

  for (const signCycle of CALENDAR) {
    for (const phase of signCycle.phases) {
      if (localDate >= phase.start && localDate <= phase.end) {
        return {
          signId: signCycle.signId,
          phaseId: phase.id,
          dates: phase
        };
      }
    }
  }
  // Si pas de phase trouvée (ex: transition entre cycles), retourner null
  // ou rechercher le cycle le plus proche ?
  return null;
};
`;

fs.writeFileSync('cosmos-web/src/data/calendar.js', fileContent);
console.log('Calendrier généré avec succès !');
