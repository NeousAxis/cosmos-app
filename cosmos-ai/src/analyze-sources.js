import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import { anthropic } from './ai-service.js';

const SOURCES_DIR = path.join(process.cwd(), '..', 'SOURCES');

/**
 * Extrait le texte d'un PDF
 */
async function extractPDFText(pdfPath) {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    return data.text;
}

/**
 * Analyse tous les PDFs sources et extrait les règles et enseignements
 */
async function analyzeSources() {
    const sources = [
        'Les douze notes de la Splendeur.pdf',
        'Les 12 Traveaux d\'Hercule_Livre_24.pdf',
        'Cahier-de-psychosophie-Les_7_rayons.pdf',
        'calendrier-2025.pdf'
    ];

    const extractedKnowledge = {};

    for (const source of sources) {
        const pdfPath = path.join(SOURCES_DIR, source);

        if (!fs.existsSync(pdfPath)) {
            console.log(`⚠️  Source non trouvée: ${source}`);
            continue;
        }

        console.log(`📖 Analyse de: ${source}...`);

        try {
            const text = await extractPDFText(pdfPath);

            // Demander à Claude d'extraire les règles et enseignements clés
            const message = await anthropic.messages.create({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 4096,
                messages: [{
                    role: 'user',
                    content: `Analyse ce document source sur la cosmosophie et l'astrologie spirituelle.

Document: ${source}

Texte extrait:
${text.substring(0, 50000)} // Limite pour ne pas dépasser le contexte

TÂCHE:
1. Identifie les RÈGLES FONDAMENTALES et PRINCIPES à respecter
2. Extrais les ENSEIGNEMENTS CLÉS pour chaque signe (si applicable)
3. Note les STRUCTURES et FORMATS utilisés
4. Relève les TERMES SPÉCIFIQUES et leur signification

Retourne une analyse structurée en markdown.`
                }]
            });

            extractedKnowledge[source] = message.content[0].text;

            // Sauvegarder l'analyse
            const outputPath = path.join(process.cwd(), 'knowledge', `${source.replace('.pdf', '')}.md`);
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
            fs.writeFileSync(outputPath, extractedKnowledge[source]);

            console.log(`✅ Analyse sauvegardée: ${outputPath}`);

        } catch (error) {
            console.error(`❌ Erreur lors de l'analyse de ${source}:`, error.message);
        }
    }

    // Créer un prompt système consolidé basé sur TOUTES les sources
    console.log('\n🧠 Génération du prompt système consolidé...');

    const consolidatedPrompt = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 8192,
        messages: [{
            role: 'user',
            content: `À partir de ces analyses de sources, crée un PROMPT SYSTÈME COMPLET pour une IA qui doit générer du contenu cosmosophique.

ANALYSES DES SOURCES:
${Object.entries(extractedKnowledge).map(([source, analysis]) => `
## ${source}
${analysis}
`).join('\n\n')}

Le prompt système doit:
1. Respecter EXACTEMENT les règles et principes trouvés dans les sources
2. Définir clairement la structure attendue pour chaque type de contenu
3. Inclure des exemples de qualité basés sur les sources
4. Préciser le ton, le style et le vocabulaire à utiliser
5. Être suffisamment détaillé pour garantir la cohérence

Retourne le prompt système complet en markdown.`
        }]
    });

    const promptPath = path.join(process.cwd(), 'SYSTEM_PROMPT.md');
    fs.writeFileSync(promptPath, consolidatedPrompt.content[0].text);

    console.log(`\n✅ Prompt système sauvegardé: ${promptPath}`);
    console.log('\n🎉 Analyse terminée!');
}

// Exécuter l'analyse
analyzeSources().catch(console.error);
