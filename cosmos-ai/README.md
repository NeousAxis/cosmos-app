# COSMOS AI — Système de Génération de Contenu

Ce système IA traduit les enseignements ésotériques des 12 Travaux d'Hercule en expériences méditatives accessibles.

## 🎯 Objectif

**TU ES UN TRADUCTEUR. TU ES UN MÉDIATEUR. TU N'ES PAS UNE AUTORITÉ.**

L'IA ne crée pas de sagesse. Elle TRADUIT les phrases clés évolutives en :
- Notes clés accessibles
- Lectures individuelles et collectives
- Pratiques méditatives concrètes

## 📚 Sources

Le système travaille UNIQUEMENT à partir de :
- Les 12 Travaux d'Hercule
- Les phrases clés évolutives
- Les 4 phases lunaires (Alignement, Contact, Distribution, Intégration)

## 🚀 Installation

```bash
cd cosmos-ai
npm install
```

## 🔑 Configuration

1. Copie `.env.example` vers `.env`
2. Ajoute ta clé API Anthropic :

```bash
ANTHROPIC_API_KEY=sk-ant-...
PORT=3001
```

## 📖 Utilisation

### 1. Démarrer l'API

```bash
npm start
```

L'API sera disponible sur `http://localhost:3001`

### 2. Générer du contenu pour tous les signes manquants

```bash
npm run generate all
```

Cela va :
- Parcourir tous les signes
- Identifier ceux avec du contenu vide ("...")
- Générer le contenu pour les 4 phases
- Sauvegarder dans `output/generated-content.json`

### 3. Régénérer une note clé spécifique

```bash
npm run generate note capricorn
```

### 4. Analyser les sources PDF (optionnel)

```bash
npm run analyze
```

Cela va extraire les enseignements des PDFs dans `/SOURCES`

## 🌐 API Endpoints

### POST /api/generate/phase

Génère le contenu pour une phase spécifique.

**Request:**
```json
{
  "signName": "Capricorne",
  "phraseEvolutive": "Je suis perdu dans la lumière suprême...",
  "noteCle": "Passer du contrôle à la maîtrise...",
  "phaseId": "alignement",
  "phaseName": "Alignement"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "lecture_reel": "...",
    "lecture_energetique": "...",
    "epreuve": "...",
    "action": "..."
  }
}
```

### POST /api/generate/note-cle

Génère une note clé à partir d'une phrase évolutive.

**Request:**
```json
{
  "signName": "Bélier",
  "phraseEvolutive": "J'avance et je régis depuis le plan mental"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "noteCle": "Dans le silence, l'intuition donne la juste direction."
  }
}
```

## 📐 Structure du Prompt

Le prompt système est défini dans `SYSTEM_PROMPT.md` et respecte :

### Règles Absolues
- ✅ Transmettre l'expérience, pas le savoir
- ✅ Langage simple et accessible
- ✅ Aucun vocabulaire ésotérique
- ❌ Ne jamais expliquer les mécanismes
- ❌ Ne jamais révéler les structures initiatiques
- ❌ Pas de "tu dois" ou "il faut"

### Format de Sortie

Pour chaque phase :
1. **lecture_reel** : Ce qui se joue intérieurement (1ère personne)
2. **lecture_energetique** : Ce qui se joue collectivement (impersonnel)
3. **epreuve** : Ce qui est confondu ou résisté
4. **action** : Un geste précis à poser

## 🔧 Développement

### Structure des fichiers

```
cosmos-ai/
├── src/
│   ├── index.js              # API Express
│   ├── ai-service.js         # Service de génération
│   ├── generate-content.js   # Script de génération batch
│   └── analyze-sources.js    # Analyse des PDFs
├── output/                   # Résultats générés
├── knowledge/                # Analyses des sources
├── SYSTEM_PROMPT.md          # Prompt système FINAL
├── package.json
└── .env
```

### Tester l'API

```bash
curl -X POST http://localhost:3001/api/generate/phase \
  -H "Content-Type: application/json" \
  -d '{
    "signName": "Capricorne",
    "phraseEvolutive": "Je suis perdu dans la lumière suprême, et pourtant je tourne le dos à cette lumière.",
    "noteCle": "Passer du contrôle à la maîtrise par une écoute profonde de l'intuition.",
    "phaseId": "alignement",
    "phaseName": "Alignement"
  }'
```

## 📝 Notes Importantes

1. **Respect du Prompt** : Le système suit EXACTEMENT les règles définies dans `SYSTEM_PROMPT.md`
2. **Pas de Créativité Libre** : L'IA traduit, elle ne crée pas
3. **Sources Exclusives** : Seuls les 12 Travaux d'Hercule sont utilisés
4. **Protection du Secret** : Les mécanismes initiatiques ne sont jamais révélés

## 🎯 Prochaines Étapes

1. Générer le contenu manquant pour tous les signes
2. Intégrer le contenu généré dans `cosmos-web/src/data/signs.js`
3. Tester la qualité des traductions
4. Ajuster le prompt si nécessaire
5. Déployer l'API pour génération en temps réel (optionnel)
