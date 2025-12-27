/**
 * Service pour appeler l'API de génération de contenu
 */

const API_BASE_URL = import.meta.env.PROD
    ? 'https://cosmos-web-delta.vercel.app/api'
    : 'http://localhost:3001/api';

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
        // Fallback sur le contenu statique en cas d'erreur
        return null;
    }
}

/**
 * Génère une note clé
 */
export async function generateNoteCle(signName, phraseEvolutive) {
    try {
        const response = await fetch(`${API_BASE_URL}/generate/note-cle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                signName,
                phraseEvolutive
            })
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status}`);
        }

        const data = await response.json();
        return data.data.noteCle;
    } catch (error) {
        console.error('Erreur lors de la génération de la note clé:', error);
        return null;
    }
}

/**
 * Vérifie si l'API est disponible
 */
export async function checkAPIHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        return response.ok;
    } catch (error) {
        return false;
    }
}
