
import { generateCosmosCalendar } from './services/astronomy.js';
import fs from 'fs';

const years = [2025, 2026, 2027, 2028, 2029, 2030];
let fullCalendar = [];

years.forEach(year => {
    const cal = generateCosmosCalendar(year);
    fullCalendar = [...fullCalendar, ...cal];
});

const content = `/**
 * CALENDRIER COSMOS GÉNÉRÉ AUTOMATIQUEMENT (2025-2030)
 * Basé sur les cycles lunaires réels.
 * 
 * Phases pivot :
 * - Alignement : Autour du 1er Quartier
 * - Contact : Autour de la Pleine Lune
 * - Distribution : Autour du Dernier Quartier
 * - Intégration : Autour de la Nouvelle Lune
 */

export const CALENDAR = ${JSON.stringify(fullCalendar, null, 2)};

export const getPhaseForDate = (date = new Date()) => {
  // Ajustement fuseau horaire pour comparaison stricte de date locale
  const d = new Date(date);
  const offset = d.getTimezoneOffset() * 60000;
  const localDate = new Date(d.getTime() - offset).toISOString().split('T')[0];

  for (const signCycle of CALENDAR) {
    for (const phase of signCycle.phases) {
      if (localDate >= phase.start && localDate <= phase.end) {
        return {
          signId: signCycle.signId,
          phaseId: phase.id,
          dates: phase // On retourne aussi les dates exactes pour affichage
        };
      }
    }
  }
  return null;
};
`;

console.log(content);
