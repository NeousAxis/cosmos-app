import { generatePhaseContent, generateNoteCle } from './src/ai-service.js';

console.log('🧪 Test du système COSMOS AI\n');

// Test 1: Génération d'une note clé
console.log('Test 1: Génération d\'une note clé pour le Bélier');
console.log('─'.repeat(60));

const testNoteCle = async () => {
    try {
        const noteCle = await generateNoteCle(
            'Bélier',
            'J\'avance et je régis depuis le plan mental'
        );
        console.log('✅ Note clé générée:');
        console.log(`   "${noteCle}"\n`);
    } catch (error) {
        console.error('❌ Erreur:', error.message);
    }
};

// Test 2: Génération d'une phase
console.log('\nTest 2: Génération du contenu pour Capricorne - Alignement');
console.log('─'.repeat(60));

const testPhase = async () => {
    try {
        const content = await generatePhaseContent(
            'Capricorne',
            'Je suis perdu dans la lumière suprême, et pourtant je tourne le dos à cette lumière.',
            'Passer du contrôle à la maîtrise par une écoute profonde de l\'intuition.',
            'alignement',
            'Alignement'
        );
        console.log('✅ Contenu généré:');
        console.log(JSON.stringify(content, null, 2));
    } catch (error) {
        console.error('❌ Erreur:', error.message);
    }
};

// Exécution séquentielle
(async () => {
    await testNoteCle();
    await testPhase();
    console.log('\n✅ Tests terminés!\n');
})();
