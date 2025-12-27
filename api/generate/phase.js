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
- lecture_energetique: Ce qui se joue collectivement en s'appuyant sur les événements mondiaux actuels (décembre 2025) ET EN EXPLIQUANT POURQUOI ET COMMENT L'ÉNERGIE DU SIGNE PRODUIT CES EFFETS DANS LE MONDE. MINIMUM 20 LIGNES, DÉVELOPPEMENT APPROFONDI. (impersonnel, paragraphe long et détaillé)
- epreuve: Ce qui est confondu ou résisté. ATTENTION : souvent c'est l'INVERSE de ce qu'on pourrait croire (1-2 phrases)
- action: Un geste précis à poser dans la vie quotidienne. NE JAMAIS DONNER DE PRATIQUE DE MÉDITATION (il y a déjà un bouton méditation). Proposer une action concrète, simple, quotidienne. (1-2 phrases)`;

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
  "lecture_reel": "Ce qui se joue intérieurement (2-3 phrases, ton impersonnel)",
  "lecture_energetique": "MINIMUM 20 LIGNES. Développement approfondi des événements mondiaux actuels avec explication du lien avec l'énergie du signe",
  "epreuve": "Ce qui est confondu ou résisté (souvent l'inverse de ce qu'on croit)",
  "action": "Un geste concret quotidien (PAS de méditation, il y a déjà un bouton pour ça)"
}

EXEMPLES :

lecture_reel :
"C'est une période où on peut ressentir l'appel à une vérité plus grande, où on se perd dans l'immensité de ce que l'on pressent. Lâcher prise sur ses certitudes demande un effort immense, une forme de foi nouvelle."

lecture_energetique (LONG, MINIMUM 20 LIGNES, avec lien explicite avec l'énergie du signe) :
"L'énergie du Capricorne, en cette fin d'année 2025, agit comme un révélateur impitoyable des structures de pouvoir mondiales. Les tensions géopolitiques qui marquent cette période ne sont pas le fruit du hasard : elles reflètent la mise à l'épreuve des systèmes établis, leur confrontation avec leur propre vérité. Cette énergie pousse chaque institution, chaque gouvernance, à se révéler dans son authenticité ou son imposture.

Les mouvements sociaux qui émergent partout dans le monde questionnent l'autorité traditionnelle car le Capricorne invite à passer du contrôle rigide à une maîtrise authentique basée sur l'intégrité. Les débats sur l'éthique de l'IA et la place de l'humain dans le travail soulignent cette tension entre progrès technique et valeurs humaines. L'énergie capricornienne demande : quelle est la vraie autorité ? Celle qui impose ou celle qui inspire ?

Les crises économiques de cette période mettent en lumière la fragilité des modèles basés sur la croissance infinie. Le Capricorne, signe de la structure et de la responsabilité, force une remise en question des fondations mêmes de nos sociétés. Les initiatives pour une économie plus durable, les questionnements sur le sens du travail, la recherche de nouvelles formes d'organisation collective : tout cela émerge sous l'impulsion de cette énergie qui refuse les façades et exige la vérité.

On observe également une transformation profonde du rapport à l'autorité dans les sphères politiques et institutionnelles. Les leaders qui tentent de maintenir un contrôle par la force se heurtent à une résistance croissante, tandis que ceux qui incarnent une autorité basée sur la compétence et l'intégrité gagnent en légitimité. C'est l'essence même du Capricorne : la vraie maîtrise ne se décrète pas, elle se démontre."

epreuve (souvent l'INVERSE de ce qu'on croit) :
"Croire qu'on manque d'ambition alors qu'on est en réalité écrasé par des attentes trop élevées. Confondre humilité avec dévalorisation de soi."

action (geste concret quotidien, PAS de méditation) :
"Identifier une tâche qu'on reporte depuis longtemps et y consacrer 15 minutes aujourd'hui, sans chercher à la terminer. Simplement commencer."

IMPORTANT : 
- lecture_energetique : MINIMUM 20 LIGNES, développement approfondi, lien explicite avec l'énergie du signe
- epreuve : Penser à l'INVERSE (souvent on se trompe sur ce qui est en jeu)
- action : JAMAIS de méditation, toujours une action concrète du quotidien

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
