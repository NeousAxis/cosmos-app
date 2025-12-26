import { SIGNS, PHASES } from './data/signs';

export const getMeditationSign = () => {
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    const day = now.getDate();

    // Simple Zodiac Config
    // Format MM-DD to match
    const check = (m, d) => {
        if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 'aries';
        if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 'taurus';
        if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return 'gemini';
        if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return 'cancer';
        if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 'leo';
        if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 'virgo';
        if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return 'libra';
        if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return 'scorpio';
        if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return 'sagittarius';
        if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return 'capricorn';
        if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 'aquarius';
        return 'pisces';
    };

    const id = check(month, day);
    return SIGNS.find(s => s.id === id) || SIGNS[0];
};

export const getCurrentPhase = () => {
    // Mocking Moon Phase Logic for demo
    // Or implementing simple cycle based on known new moon.
    // Let's use a 29.5 day cycle from a known Base Date.
    // Base New Moon: Jan 11, 2024 (approx).

    const baseDate = new Date('2024-01-11T11:57:00Z');
    const lunation = 29.53059; // days
    const now = new Date();
    const diffTime = Math.abs(now - baseDate);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    const phaseAge = diffDays % lunation;

    // 0-7.4: New -> First Q (Alignement -> Contact)
    // 7.4-14.8: First Q -> Full (Contact -> Distribution)
    // 14.8-22.1: Full -> Last Q (Distribution -> Integration)
    // 22.1-29.5: Last Q -> New (Integration -> Alignement)

    // Mapping to our phases:
    // Phase 1: New Moon to First Quarter (Alignement)
    // Phase 2: Waxing (Contact) - Actually often "Contact" is Full Moon approach.
    // Let's adjust:
    // Alignement: New Moon (Days 0-3?)
    // Contact: Waxing (Days 4-13?)
    // Distribution: Full Moon (Days 14-17?)
    // Integration: Waning (Days 18-29?)

    // Wait, the prompt says "Les phases n’ont AUCUN sens autonome. Elles sont des MODES DE TRAVERSÉE".
    // Let's map roughly to 4 weeks.

    if (phaseAge < 7.4) return PHASES[0]; // Alignement
    if (phaseAge < 14.8) return PHASES[1]; // Contact
    if (phaseAge < 22.1) return PHASES[2]; // Distribution
    return PHASES[3]; // Integration
};
