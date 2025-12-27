import React from 'react';

// Utilise les mêmes Emojis que le calendrier pour la cohérence visuelle
const MoonPhase = ({ phaseId, percentageStr = "0%" }) => {
    // 1. Convertir "XX%" en nombre 0-100
    const progress = parseInt(percentageStr.replace('%', '')) || 0;

    let emoji = '🌑';

    // Logique de sélection précise de l'Emoji basé sur la phase Cosmos et sa progression
    if (phaseId === 'alignement') {
        // De Nouvelle Lune à Premier Quartier
        if (progress < 40) emoji = '🌑';      // Nouvelle Lune
        else if (progress < 75) emoji = '🌒'; // Croissant
        else emoji = '🌓';                    // Quartier
    }
    else if (phaseId === 'contact') {
        // De Premier Quartier à Pleine Lune
        if (progress < 30) emoji = '🌓';      // Quartier
        else if (progress < 70) emoji = '🌔'; // Gibbeuse Croissante
        else emoji = '🌕';                    // Pleine Lune
    }
    else if (phaseId === 'distribution') {
        // De Pleine Lune à Dernier Quartier
        if (progress < 40) emoji = '🌕';      // Pleine Lune
        else if (progress < 75) emoji = '🌖'; // Gibbeuse Décroissante
        else emoji = '🌗';                    // Dernier Quartier
    }
    else if (phaseId === 'integration') {
        // De Dernier Quartier à Nouvelle Lune
        if (progress < 25) emoji = '🌗';      // Dernier Quartier
        else if (progress < 75) emoji = '🌘'; // Dernier Croissant
        else emoji = '🌑';                    // Nouvelle Lune
    } else {
        // Fallback ou période de transition
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
