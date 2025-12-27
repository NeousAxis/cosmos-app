import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Charger le prompt système depuis le fichier
const SYSTEM_PROMPT = fs.readFileSync(
    path.join(process.cwd(), 'SYSTEM_PROMPT.md'),
    'utf-8'
);

/**
 * Génère le contenu pour une phase spécifique d'un signe
 */
export async function generatePhaseContent(signName, phraseEvolutive, noteCle, phaseId, phaseName) {

    const prompt = `${SYSTEM_PROMPT}

---

Tu travailles sur le signe du ${signName}.

**Phrase clé évolutive (source) :**
"${phraseEvolutive}"

**Note clé (traduction accessible) :**
"${noteCle}"

**Phase actuelle : ${phaseName} (${phaseId})**

Génère le contenu pour cette phase en respectant EXACTEMENT le format suivant :

{
  "lecture_reel": "Ce qui se joue intérieurement pour la personne (2-3 phrases, langage à la première personne, concret)",
  "lecture_energetique": "Ce qui se joue collectivement dans le monde (2-3 phrases, langage impersonnel, tendances sociétales)",
  "epreuve": "Ce qui est souvent confondu ou résisté (1-2 phrases)",
  "action": "Un geste précis à poser, aligné avec la note clé (1-2 phrases, formulé comme une décision)"
}

RAPPELS CRITIQUES :
- Tu TRADUIS la sagesse, tu ne la crées pas
- Aucun vocabulaire ésotérique
- Aucune explication du "pourquoi"
- Langage simple, ancré dans le quotidien
- Pas de "tu dois" ou "il faut"
- Transmettre l'expérience, pas le savoir

Retourne UNIQUEMENT le JSON, rien d'autre.`;

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
        }
    });

    const result = await model.generateContent(prompt);
    const content = result.response.text();

    // Extraire le JSON de la réponse
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Impossible d\'extraire le JSON de la réponse');
}

/**
 * Génère tous les contenus pour un signe (4 phases)
 */
export async function generateAllPhasesForSign(signData) {
    const phases = [
        { id: 'alignement', name: 'Alignement' },
        { id: 'contact', name: 'Contact' },
        { id: 'distribution', name: 'Distribution' },
        { id: 'integration', name: 'Intégration' }
    ];

    const result = {};

    for (const phase of phases) {
        console.log(`Génération: ${signData.name} - ${phase.name}...`);

        const content = await generatePhaseContent(
            signData.name,
            signData.phrase_evolutive,
            signData.note_cle,
            phase.id,
            phase.name
        );

        result[phase.id] = content;

        // Pause pour éviter rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return result;
}

/**
 * Génère une note clé à partir d'une phrase évolutive
 */
export async function generateNoteCle(signName, phraseEvolutive) {
    const prompt = `${SYSTEM_PROMPT}

---

Tu travailles sur le signe du ${signName}.

**Phrase clé évolutive (source) :**
"${phraseEvolutive}"

Ta tâche : créer UNE NOTE CLÉ qui est une TRANSMUTATION PÉDAGOGIQUE de cette phrase.

Critères OBLIGATOIRES :
- 1 phrase unique
- langage simple et accessible
- fidèle au sens profond de la phrase clé évolutive
- non abstraite
- non psychologique
- non comportementale
- non morale

Exemple de justesse (Bélier) :
Phrase source : "J'avance et je régis depuis le plan mental"
Note clé : "Dans le silence, l'intuition donne la juste direction."

Retourne UNIQUEMENT la note clé, rien d'autre.`;

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 256,
        }
    });

    const result = await model.generateContent(prompt);
    return result.response.text().trim().replace(/^["']|["']$/g, '');
}

export { genAI };
