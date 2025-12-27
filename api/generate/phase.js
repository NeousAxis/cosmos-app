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
- Tu utilises STRICTEMENT un ton impersonnel avec "on", "ses", "l'on" - JAMAIS "je", "mon", "ma"
- Tu transmets une expérience, pas un savoir
- Aucun vocabulaire ésotérique
- Aucune explication du "pourquoi"
- Langage simple, ancré dans le quotidien
- Pas de "tu dois" ou "il faut"

## FORMAT DE SORTIE
Pour chaque phase, retourne un JSON avec :
- lecture_reel: Ce qui se joue intérieurement (ton impersonnel STRICT avec "on", "ses", "l'on", 2-3 phrases)
- lecture_energetique: Ce qui se joue collectivement en s'appuyant sur les événements mondiaux actuels (décembre 2025) ET EN EXPLIQUANT POURQUOI ET COMMENT L'ÉNERGIE DU SIGNE PRODUIT CES EFFETS DANS LE MONDE. MINIMUM 15 LIGNES, DÉVELOPPEMENT APPROFONDI. (impersonnel, paragraphe long et détaillé)
- epreuve: Ce qui est confondu ou résisté. ATTENTION : souvent c'est l'INVERSE de ce qu'on pourrait croire (1-2 phrases)
- action: Un geste précis à poser dans la vie quotidienne EN LIEN DIRECT AVEC L'ÉNERGIE DU SIGNE ET LA NOTE CLÉ. NE JAMAIS DONNER DE PRATIQUE DE MÉDITATION (il y a déjà un bouton méditation). Proposer une action concrète, efficace, qui incarne l'énergie du mois. (1-2 phrases)`;

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

IMPORTANT : Utilise STRICTEMENT la forme impersonnelle ("on", "ses", "l'on"). JAMAIS "je", "mon", "ma".

EXEMPLES :

lecture_reel (FORME IMPERSONNELLE STRICTE) :
"Cette période invite à reconnaître ses propres limites sans les voir comme des faiblesses. On traverse un moment où le besoin de structure s'impose, non comme une contrainte, mais comme une nécessité pour tenir debout."

lecture_energetique (15+ LIGNES, avec lien explicite avec l'énergie du signe) :
"L'énergie du Capricorne agit comme un révélateur des structures de pouvoir. Les tensions géopolitiques reflètent la mise à l'épreuve des systèmes établis. Cette énergie pousse chaque institution à se révéler dans son authenticité ou son imposture. Les mouvements sociaux questionnent l'autorité car le Capricorne invite à passer du contrôle rigide à une maîtrise authentique. Les crises économiques mettent en lumière la fragilité des modèles basés sur la croissance infinie."

epreuve (souvent l'INVERSE) :
"Croire qu'on manque d'ambition alors qu'on est écrasé par des attentes trop élevées."

action (geste concret en lien avec la note clé, PAS de méditation) :
"Au lieu de planifier rigidement la journée, définir une seule priorité essentielle et laisser l'intuition guider le reste du temps. Observer comment la maîtrise peut émerger du lâcher-prise plutôt que du contrôle."

Retourne UNIQUEMENT le JSON, rien d'autre.`;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 2048,
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
