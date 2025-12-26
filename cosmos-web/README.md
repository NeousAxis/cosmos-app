# COSMOS - Pratique Spirituelle

Application web basée sur la méditation et la symbolique des 12 Travaux d'Hercule.

## Fonctionnalités
- **Cycle des 12 Signes** : Affiche automatiquement le signe du mois et sa Note Clé (Traduite selon la méthode "Antigravity").
- **Phases Lunaires** : Indique la phase de traversée (Alignement, Contact, Distribution, Intégration) basée sur le cycle lunaire.
- **Méditation Guidée** : Une séquence canonique de 4 phases avec minuteur intégré et instructions visuelles.
- **Design Cosmique** : Interface "Premium" avec animations douces et ambiance immersive.

## Installation et Lancement

1. Aller dans le dossier :
   ```bash
   cd cosmos-web
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Lancer le mode développement :
   ```bash
   npm run dev
   ```

## Structure
- `src/data/signs.js` : Contient la logique des 12 signes, les Phrases Évolutives et les Notes Clés.
- `src/components/Meditation.jsx` : Le moteur de la séquence de méditation.
- `src/index.css` : Le système de design "Vanilla CSS".

## Personnalisation
Pour modifier les phrases ou la logique, éditez `src/data/signs.js`.
