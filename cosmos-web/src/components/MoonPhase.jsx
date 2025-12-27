import React from 'react';

const MoonPhase = ({ phaseId, percentageStr = "0%" }) => {
    // 1. Convertir "XX%" en nombre 0-1
    const progress = parseInt(percentageStr.replace('%', '')) / 100;

    // 2. Déterminer la "phase lunaire globale" (0 = NL, 0.5 = PL, 1 = NL)
    // Alignement : 0.0 -> 0.25 (NL -> 1Q)
    // Contact    : 0.25 -> 0.5 (1Q -> PL)
    // Distribution: 0.5 -> 0.75 (PL -> DQ)
    // Integration : 0.75 -> 1.0 (DQ -> NL)

    let base = 0;
    if (phaseId === 'alignement') base = 0.0;
    if (phaseId === 'contact') base = 0.25;
    if (phaseId === 'distribution') base = 0.5;
    if (phaseId === 'integration') base = 0.75;

    // Phase globale actuelle (0 à 1 sur tout le cycle)
    // On ajoute 0.25 * progress car chaque phase Cosmos couvre un quart de cycle lunaire
    const lunarCyclePos = base + (0.25 * progress);

    return (
        <svg width="20" height="20" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
            {/* Fond sombre (Lune entière ombrée) */}
            <circle cx="50" cy="50" r="45" fill="#333" stroke="var(--text-main)" strokeWidth="2" opacity="0.3" />

            {/* Partie éclairée dynamique */}
            <path d={getMoonPath(lunarCyclePos)} fill="var(--text-main)" stroke="none" />
        </svg>
    );
};

// Fonction mathématique pour dessiner la phase
// t de 0 (NL) à 1 (NL fin)
function getMoonPath(t) {
    const cx = 50, cy = 50, r = 45;

    // Normaliser t pour qu'il soit entre 0 et 1
    t = t % 1;

    // Pleine Lune
    if (Math.abs(t - 0.5) < 0.01) {
        return `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`;
    }
    // Nouvelle Lune
    if (t < 0.01 || t > 0.99) {
        return ""; // Ou un cercle vide
    }

    // Gestion Croissant vs Gibbeuse
    // On utilise la technique du "terminator" (la ligne d'ombre)
    // C'est une courbe de Bezier ou un arc elliptique qui change de courbure.

    // 1. Arc extérieur : Toujours un demi-cercle côté soleil
    // Waxing (0 -> 0.5) : Soleil à Droite (dans notre repère tourné, ça dépend, disons "droit" visuel)
    // Mais on a tourné le SVG de -90deg.
    // Restons simple : 
    // Waxing (0-0.5) : Côté éclairé "Droit".
    // Waning (0.5-1) : Côté éclairé "Gauche".

    const isWaxing = t < 0.5;
    const illumination = isWaxing ? t * 2 : (1 - t) * 2; // 0 -> 1 -> 0

    // Rayon de l'ellipse du terminateur (va de R à -R)
    // rX varie de R (NL) à 0 (1Q) à -R (PL) ?
    // Non.
    // NL (0%) -> rX = R (courbe suit le bord) -> Vide
    // 1Q (50%) -> rX = 0 (Ligne droite)
    // PL (100%) -> rX = -R (Courbe inversée) -> Plein

    // Pour Waxing :
    // Arc extérieur droit fixe : M 50,5 A 45,45 0 0 1 50,95
    // Arc intérieur (terminateur) : M 50,95 A rX,45 0 0 {sweep} 50,5

    // Calculons rX pour le terminateur
    // Il doit aller de R (à 0 illum) à -R (à 1 illum).
    // rX = 45 * (1 - 2*illumination) ?
    // Wait.
    // NL (ill=0) -> rX = 45. Terminateur = Arc gauche. Surface nulle ?
    // PL (ill=1) -> rX = -45. Terminateur = Arc droit. Surface totale ?

    // Correction : L'illumination varie de 0 (NL) à 1 (PL).
    // t va de 0 à 0.5 => illum va de 0 à 1.

    const size = isWaxing ? (t * 2) : ((1 - t) * 2); // 0 (Dark) -> 1 (Full) -> 0 (Dark)

    // Le rayon horizontal de l'ellipse d'ombre
    // rX va de 45 à -45
    const rX = r * (1 - 2 * size);

    let path = "";

    if (isWaxing) {
        // Croissant -> Gibbeuse
        // Arc droit (fixe) + Terminateur
        // M 50 5 A 45 45 0 0 1 50 95 (Demi-cercle Droit)

        // Si size < 0.5 (Croissant) : Terminateur va vers la droite aussi.
        // Si size > 0.5 (Gibbeuse) : Terminateur va vers la gauche.

        // Sweep flag change ?
        const sweep = 1; // Toujours le même sens pour fermer ?

        // M 50 5 ... Arc Droit ... 50 95
        // Retour vers 50 5 avec l'ellipse.
        // A |rX| 45 0 0 1 50 5 (Si rX positif, courbe vers gauche. Si rX négatif, vers droite ?)

        // SVG paths are tricky.
        // Using "sweep" depending on sign of rX is better simulation.
        const sweepTerminator = (size > 0.5) ? 1 : 0;
        const absRx = Math.abs(rX);

        path = `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${absRx} ${r} 0 0 ${sweepTerminator} ${cx} ${cy - r}`;
    } else {
        // Décroissant
        // Arc Gauche (fixe)
        // M 50 5 A 45 45 0 0 0 50 95

        const sweepTerminator = (size > 0.5) ? 0 : 1;
        const absRx = Math.abs(rX);

        path = `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${absRx} ${r} 0 0 ${sweepTerminator} ${cx} ${cy - r}`;
    }

    return path;
}

export default MoonPhase;
