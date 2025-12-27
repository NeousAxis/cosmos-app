import { generateAllPhasesForSign, generateNoteCle } from './ai-service.js';
import { SIGNS } from '../../cosmos-web/src/data/signs.js';
import fs from 'fs';
import path from 'path';

/**
 * Génère le contenu pour tous les signes qui n'ont pas encore de contenu
 */
async function generateMissingContent() {
    console.log('🚀 Démarrage de la génération de contenu...\n');

    const signsToGenerate = SIGNS.filter(sign => {
        // Vérifier si le signe a du contenu vide ("...")
        const hasEmptyContent = Object.values(sign.phases_content || {}).some(phase =>
            phase.lecture_reel === "..." || !phase.lecture_reel
        );
        return hasEmptyContent;
    });

    console.log(`📊 ${signsToGenerate.length} signes à compléter sur ${SIGNS.length}\n`);

    const results = {};

    for (const sign of signsToGenerate) {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`🔮 Traitement du signe: ${sign.name}`);
        console.log(`${'='.repeat(60)}`);

        console.log(`📝 Phrase évolutive: "${sign.phrase_evolutive}"`);
        console.log(`🎵 Note clé actuelle: "${sign.note_cle}"`);

        try {
            // Générer le contenu pour les 4 phases
            const phasesContent = await generateAllPhasesForSign(sign);

            results[sign.id] = {
                name: sign.name,
                phrase_evolutive: sign.phrase_evolutive,
                note_cle: sign.note_cle,
                phases_content: phasesContent
            };

            console.log(`\n✅ Contenu généré pour ${sign.name}`);
            console.log(JSON.stringify(phasesContent, null, 2));

        } catch (error) {
            console.error(`\n❌ Erreur pour ${sign.name}:`, error.message);
            results[sign.id] = { error: error.message };
        }

        // Pause entre chaque signe
        console.log('\n⏸️  Pause de 2 secondes...');
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Sauvegarder les résultats
    const outputPath = path.join(process.cwd(), 'output', 'generated-content.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

    console.log(`\n\n${'='.repeat(60)}`);
    console.log(`✅ Génération terminée !`);
    console.log(`📁 Résultats sauvegardés: ${outputPath}`);
    console.log(`${'='.repeat(60)}\n`);

    return results;
}

/**
 * Génère une nouvelle note clé pour un signe spécifique
 */
async function regenerateNoteCle(signId) {
    const sign = SIGNS.find(s => s.id === signId);

    if (!sign) {
        console.error(`❌ Signe non trouvé: ${signId}`);
        return;
    }

    console.log(`\n🔮 Régénération de la note clé pour: ${sign.name}`);
    console.log(`📝 Phrase évolutive: "${sign.phrase_evolutive}"`);
    console.log(`🎵 Note clé actuelle: "${sign.note_cle}"`);

    try {
        const newNoteCle = await generateNoteCle(sign.name, sign.phrase_evolutive);

        console.log(`\n✨ Nouvelle note clé proposée:`);
        console.log(`"${newNoteCle}"`);

        return newNoteCle;
    } catch (error) {
        console.error(`❌ Erreur:`, error.message);
    }
}

// Exécution
const command = process.argv[2];
const arg = process.argv[3];

if (command === 'all') {
    generateMissingContent().catch(console.error);
} else if (command === 'note' && arg) {
    regenerateNoteCle(arg).catch(console.error);
} else {
    console.log(`
Usage:
  npm run generate all          # Génère le contenu pour tous les signes manquants
  npm run generate note <id>    # Régénère la note clé pour un signe spécifique

Exemples:
  npm run generate all
  npm run generate note capricorn
  `);
}
