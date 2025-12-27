import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generatePhaseContent, generateNoteCle } from './ai-service.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/**
 * GET /health
 * Vérification de l'état du service
 */
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'COSMOS AI' });
});

/**
 * POST /api/generate/phase
 * Génère le contenu pour une phase spécifique
 * 
 * Body: {
 *   signName: string,
 *   phraseEvolutive: string,
 *   noteCle: string,
 *   phaseId: string,
 *   phaseName: string
 * }
 */
app.post('/api/generate/phase', async (req, res) => {
    try {
        const { signName, phraseEvolutive, noteCle, phaseId, phaseName } = req.body;

        if (!signName || !phraseEvolutive || !noteCle || !phaseId || !phaseName) {
            return res.status(400).json({
                error: 'Paramètres manquants',
                required: ['signName', 'phraseEvolutive', 'noteCle', 'phaseId', 'phaseName']
            });
        }

        console.log(`📝 Génération: ${signName} - ${phaseName}`);

        const content = await generatePhaseContent(
            signName,
            phraseEvolutive,
            noteCle,
            phaseId,
            phaseName
        );

        res.json({
            success: true,
            data: content
        });

    } catch (error) {
        console.error('❌ Erreur:', error);
        res.status(500).json({
            error: 'Erreur lors de la génération',
            message: error.message
        });
    }
});

/**
 * POST /api/generate/note-cle
 * Génère une note clé à partir d'une phrase évolutive
 * 
 * Body: {
 *   signName: string,
 *   phraseEvolutive: string
 * }
 */
app.post('/api/generate/note-cle', async (req, res) => {
    try {
        const { signName, phraseEvolutive } = req.body;

        if (!signName || !phraseEvolutive) {
            return res.status(400).json({
                error: 'Paramètres manquants',
                required: ['signName', 'phraseEvolutive']
            });
        }

        console.log(`🎵 Génération note clé: ${signName}`);

        const noteCle = await generateNoteCle(signName, phraseEvolutive);

        res.json({
            success: true,
            data: { noteCle }
        });

    } catch (error) {
        console.error('❌ Erreur:', error);
        res.status(500).json({
            error: 'Erreur lors de la génération',
            message: error.message
        });
    }
});

/**
 * GET /api/prompt
 * Retourne le prompt système actuel
 */
app.get('/api/prompt', (req, res) => {
    res.json({
        message: 'Le prompt système est chargé depuis SYSTEM_PROMPT.md',
        path: './SYSTEM_PROMPT.md'
    });
});

app.listen(PORT, () => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🌟 COSMOS AI Service démarré`);
    console.log(`📡 Port: ${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`${'='.repeat(60)}\n`);
});

export default app;
