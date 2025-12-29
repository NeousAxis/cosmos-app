# Procédure de Sauvegarde et Publication de Version (Release) sur GitHub

Ce guide décrit les étapes nécessaires pour sauvegarder proprement votre travail, incrémenter la version du projet, et publier une "Release" officielle qui apparaîtra sur GitHub.

---

## 1. Mise à Jour de la Version (Code)

Avant de créer une sauvegarde officielle, il est important que le code connaisse son propre numéro de version.

1.  Ouvrez le fichier `cosmos-web/package.json`.
2.  Repérez la ligne `"version": "..."`.
3.  Incrémentez le numéro (par exemple, passez de `"1.0.5"` à `"1.0.6"`).
4.  Sauvegardez le fichier.

---

## 2. Sauvegarde des Modifications (Commit)

Cette étape valide vos changements locaux (y compris le changement de numéro de version) dans l'historique Git.

Ouvrez votre terminal à la racine du projet et lancez :

```bash
# 1. Ajouter tous les fichiers modifiés à l'index
git add .

# 2. Créer le point de sauvegarde (Commit) avec un message clair
git commit -m "chore: passage en version 1.0.6"
```

---

## 3. Création de l'Étiquette (Tag)

Le "Tag" est comme un marque-page indélébile que l'on pose sur ce commit précis pour dire "Ceci est exactement la version 1.0.6".

```bash
# Crée le tag v1.0.6 (le 'v' est une convention standard)
git tag -a v1.0.6 -m "Release v1.0.6"
```

---

## 4. Envoi sur GitHub (Push)

Cette étape envoie votre code ET votre nouvelle étiquette vers les serveurs de GitHub.

```bash
# Envoie la branche principale (main) et tous les tags associés
git push origin main --tags
```

À ce stade, le code est sécurisé sur GitHub et le tag existe. Cependant, pour qu'il apparaisse proprement dans la section **"Releases"** avec des notes, il reste une petite étape.

---

## 5. Création de la Release (Publication)

Vous avez deux méthodes pour transformer votre tag en une belle Release officielle.

### Méthode A : Via le Terminal (Rapide)
*Nécessite que l'outil `gh` (GitHub CLI) soit installé.*

```bash
gh release create v1.0.6 --title "v1.0.6" --notes "Description des nouveautés de cette version..."
```

### Méthode B : Via le Site Web GitHub (Visuel)

1.  Allez sur votre projet GitHub : [https://github.com/NeousAxis/cosmos-app](https://github.com/NeousAxis/cosmos-app)
2.  Dans la colonne de droite, cliquez sur **"Releases"**.
3.  Vous devriez voir votre nouveau tag `v1.0.6`.
4.  Cliquez sur **"Draft a new release"** (ou sélectionnez le tag puis "Edit").
5.  Dans le menu déroulant "Choose a tag", sélectionnez `v1.0.6`.
6.  Donnez un titre à la release (ex: `v1.0.6`).
7.  Écrivez une description des changements.
8.  Cliquez sur le bouton vert **"Publish release"**.

---

## Résumé Rapide (Cheat Sheet)

À copier-coller dans votre terminal (en adaptant le numéro `1.0.6`) :

```bash
cd cosmos-web
# (Modifiez package.json manuellement avant)
cd ..

git add .
git commit -m "Release v1.0.6"
git tag -a v1.0.6 -m "v1.0.6"
git push origin main --tags
gh release create v1.0.6 --title "v1.0.6" --notes "Notes de version ici"
```
