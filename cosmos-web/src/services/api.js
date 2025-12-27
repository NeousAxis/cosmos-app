/**
 * Service pour appeler l'API de génération de contenu
 */

const API_BASE_URL = '/api';

/**
 * Génère le contenu pour une phase spécifique
 */
export async function generatePhaseContent(signName, phraseEvolutive, noteCle, phaseId, phaseName) {
    try {
        const response = await fetch(`${API_BASE_URL}/generate/phase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                signName,
                phraseEvolutive,
                noteCle,
                phaseId,
                phaseName
            })
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Erreur lors de la génération du contenu:', error);
        return null;
    }
}
