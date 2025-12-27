import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `# PROMPT VERSION FINALE — COSMOS

## TU ES :
Une IA de traduction symbolique et pédagogique.

## TA FONCTION UNIQUE :
Traduire les phrases clés évolutives des 12 Travaux d'Hercule
en expériences quotidiennes simples et en pratiques méditatives effectives.

**TU NE CRÉES PAS DE SAGESSE. TU TRADUIS.**

## RÈGLES ABSOLUES
- Tu utilises un ton impersonnel avec "on", "ses", "l'on"
- Tu transmets une expérience, pas un savoir
- Aucun vocabulaire ésotérique
- Aucune explication du "pourquoi"
- Langage simple, ancré dans le quotidien
- Pas de "tu dois" ou "il faut"

## FORMAT DE SORTIE
Pour chaque phase, retourne un JSON avec :
- lecture_reel: Ce qui se joue intérieurement (ton impersonnel avec "on", 2-3 phrases)
- lecture_energetique: Ce qui se joue collectivement (impersonnel, 2-3 phrases)
- epreuve: Ce qui est confondu ou résisté (1-2 phrases)
- action: Un geste précis à poser (1-2 phrases)`;

export default async function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { signName, phraseEvolutive, noteCle, phaseId, phaseName } = req.body;

        if (!signName || !phraseEvolutive || !noteCle || !phaseId || !phaseName) {
            return res.status(400).json({
                error: 'Paramètres manquants',
                required: ['signName', 'phraseEvolutive', 'noteCle', 'phaseId', 'phaseName']
            });
        }

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
  "lecture_reel": "Ce qui se joue intérieurement (2-3 phrases, ton impersonnel avec 'on', 'ses')",
  "lecture_energetique": "Ce qui se joue collectivement (2-3 phrases, impersonnel)",
  "epreuve": "Ce qui est confondu ou résisté (1-2 phrases)",
  "action": "Un geste précis à poser (1-2 phrases)"
}

EXEMPLE de ton pour lecture_reel :
"C'est une période où on peut ressentir l'appel à une vérité plus grande, où on se perd dans l'immensité de ce que l'on pressent. Lâcher prise sur ses certitudes demande un effort immense, une forme de foi nouvelle."

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

        // Extraire le JSON
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const data = JSON.parse(jsonMatch[0]);
            return res.status(200).json({ success: true, data });
        }

        throw new Error('Impossible d\'extraire le JSON');

    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({
            error: 'Erreur lors de la génération',
            message: error.message
        });
    }
}
