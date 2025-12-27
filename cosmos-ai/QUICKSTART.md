# 🚀 DÉMARRAGE RAPIDE — COSMOS AI

## ⚡ En 3 étapes

### 1️⃣ Configure ta clé API

Crée le fichier `.env` dans `cosmos-ai/` :

```bash
cd cosmos-ai
echo "ANTHROPIC_API_KEY=ta-clé-ici" > .env
echo "PORT=3001" >> .env
```

Ou copie `.env.example` et modifie-le.

### 2️⃣ Teste que ça fonctionne

```bash
node test.js
```

Tu devrais voir :
- ✅ Une note clé générée pour le Bélier
- ✅ Un contenu complet pour Capricorne - Alignement

### 3️⃣ Génère tout le contenu manquant

```bash
npm run generate all
```

Cela va :
- Scanner tous les 12 signes
- Identifier ceux avec du contenu vide ("...")
- Générer le contenu pour les 4 phases de chaque signe
- Sauvegarder dans `output/generated-content.json`

---

## 📊 Résultat Attendu

Le fichier `output/generated-content.json` contiendra :

```json
{
  "aries": {
    "name": "Bélier",
    "phrase_evolutive": "...",
    "note_cle": "...",
    "phases_content": {
      "alignement": {
        "lecture_reel": "...",
        "lecture_energetique": "...",
        "epreuve": "...",
        "action": "..."
      },
      "contact": { ... },
      "distribution": { ... },
      "integration": { ... }
    }
  },
  ...
}
```

## 🔄 Intégration dans l'App

1. Ouvre `output/generated-content.json`
2. Copie le contenu pour chaque signe
3. Colle-le dans `cosmos-web/src/data/signs.js`
4. Remplace les `"..."` par le contenu généré

---

## 🛠️ Commandes Utiles

```bash
# Démarrer l'API
npm start

# Générer tout
npm run generate all

# Générer une note clé spécifique
npm run generate note belier

# Analyser les PDFs sources
npm run analyze

# Tester
node test.js
```

---

## ❓ Problèmes Courants

### Erreur: "ANTHROPIC_API_KEY not found"
→ Tu n'as pas configuré le fichier `.env`

### Erreur: "Cannot find module"
→ Lance `npm install` dans `cosmos-ai/`

### L'IA génère du contenu trop ésotérique
→ Le prompt système est dans `SYSTEM_PROMPT.md`, vérifie qu'il est bien chargé

---

## ✅ C'est Prêt !

Le système respecte EXACTEMENT ton prompt du NotebookLM.
Il ne crée pas de sagesse, il TRADUIT.

Bonne génération ! 🌟
