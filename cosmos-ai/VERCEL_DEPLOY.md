# 🚀 DÉPLOIEMENT VERCEL — COSMOS AI

## Option 1 : Via Dashboard Vercel (RECOMMANDÉ)

### 1. Va sur Vercel
https://vercel.com/new

### 2. Importe le projet
- Sélectionne le repo `NeousAxis/cosmos-app`
- **Root Directory** : `cosmos-ai`
- Framework Preset : Other

### 3. Configure les variables d'environnement

Dans les settings du projet, ajoute :

**Variable** : `GEMINI_API_KEY`  
**Value** : Ta clé Gemini (de https://aistudio.google.com/apikey)

### 4. Deploy !

L'API sera disponible sur : `https://cosmos-ai.vercel.app`

---

## Option 2 : Via CLI Vercel

```bash
cd cosmos-ai

# Installe Vercel CLI si pas déjà fait
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Ajoute la variable d'environnement
vercel env add GEMINI_API_KEY

# Redeploy en production
vercel --prod
```

---

## 🧪 Tester l'API déployée

```bash
curl https://ton-url.vercel.app/health
```

Devrait retourner :
```json
{
  "status": "ok",
  "service": "COSMOS AI"
}
```

---

## 📡 Endpoints disponibles

- `GET /health` - Vérification
- `POST /api/generate/phase` - Génère une phase
- `POST /api/generate/note-cle` - Génère une note clé

---

## ⚠️ IMPORTANT

Pour l'instant, tu as 2 options :

### A. API Déployée sur Vercel
- ✅ Accessible partout
- ✅ Pas besoin de serveur local
- ❌ Coûte des requêtes Gemini à chaque appel

### B. Génération Locale (RECOMMANDÉ pour remplir les données)
- ✅ Gratuit (sauf API Gemini)
- ✅ Plus rapide
- ✅ Génère tout d'un coup
- ❌ Nécessite Node.js local

**Pour remplir les données des signes, utilise la génération locale :**

```bash
cd cosmos-ai
echo "GEMINI_API_KEY=ta-clé" > .env
npm run generate all
```

Puis copie `output/generated-content.json` dans `cosmos-web/src/data/signs.js`

---

L'API Vercel est utile si tu veux régénérer du contenu à la volée depuis l'app web plus tard.
