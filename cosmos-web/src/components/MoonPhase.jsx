import React from 'react';

// Utilise les mêmes Emojis que le calendrier pour la cohérence visuelle
const MoonPhase = ({ phaseId, percentageStr = "0%" }) => {
    // 1. Convertir "XX%" en nombre 0-100
    const progress = parseInt(percentageStr.replace('%', '')) || 0;

    let emoji = '🌑';

    // Logique de sélection précise de l'Emoji basée sur les phases Cosmos
    // Alignement : De 45° (Mid New-1Q) à 135° (Mid 1Q-Full). Centre: 1Q (90°)
    if (phaseId === 'alignement') {
        if (progress < 30) emoji = '🌒';      // Croissant
        else if (progress < 70) emoji = '🌓'; // Premier Quartier
        else emoji = '🌔';                    // Gibbeuse Croissante
    }
    // Contact : De 135° (Mid 1Q-Full) à 225° (Mid Full-LastQ). Centre: Full (180°)
    else if (phaseId === 'contact') {
        if (progress < 30) emoji = '🌔';      // Gibbeuse Croissante
        else if (progress < 70) emoji = '🌕'; // Pleine Lune
        else emoji = '🌖';                    // Gibbeuse Décroissante
    }
    // Distribution : De 225° (Mid Full-LastQ) à 315° (Mid LastQ-New). Centre: LastQ (270°)
    else if (phaseId === 'distribution') {
        if (progress < 30) emoji = '🌖';      // Gibbeuse Décroissante
        else if (progress < 70) emoji = '🌗'; // Dernier Quartier
        else emoji = '🌘';                    // Dernier Croissant
    }
    // Intégration : De 315° (Mid LastQ-New) à 45° (Mid New-1Q). Centre: New (0/360°)
    else if (phaseId === 'integration') {
        if (progress < 30) emoji = '🌘';      // Dernier Croissant
        else if (progress < 70) emoji = '🌑'; // Nouvelle Lune
        else emoji = '🌒';                    // Premier Croissant (Cycle suivant)
    } else {
        emoji = '🌑';
    }

    return (
        <span style={{
            fontSize: '18px',
            lineHeight: 1,
            display: 'inline-block',
            marginRight: '6px' // Petit ajustement d'espacement pour l'alignement
        }}>
            {emoji}
        </span>
    );
};

export default MoonPhase;
