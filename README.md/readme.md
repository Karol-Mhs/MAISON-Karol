
---

README.md

# Recherche de publications en biologie spatiale

Une application web open-source pour explorer *608 publications NASA sur la biologie spatiale*.  
L’application permet aux utilisateurs de rechercher, filtrer et parcourir les publications soit *localement* soit *en ligne via GitHub*.

## Fonctionnalités

- 🔎 *Recherche de publications*
  - Recherche multi-mots-clés
  - Recherche floue (tolère les fautes de frappe)
  - Similarité sémantique (mise à jour future : synonymes/embeddings)
  - Résultats classés par pertinence

- 🤖 *Chatbot (placeholder)*
  - Réservé pour un futur pipeline de scraping, résumé et réponses basées sur les publications

- 🌐 Fonctionne à la fois *hors ligne* (CSV local) et *en ligne* (CSV GitHub)

## Structure du projet

NASA HACKATON/ │ ├── index.html              → mise en page HTML principale + imports JS ├── /assets/
│     ├── style.css         → styles CSS │     └── logo.png          → logo optionnel ├── /js/
│     ├── search.js         → parsing CSV, recherche floue, fallback local→GitHub │     ├── chatbot.js        → placeholder pour futur pipeline │     └── utils.js          → fonctions utilitaires partagées (normalisation texte, synonymes) ├── SB_publication_PMC.csv  → copie locale optionnelle du CSV └── README.md               → description et instructions

## Fonctionnement

1. *Chargement du CSV*
   - Tente d’abord de charger le CSV local (SB_publication_PMC.csv)
   - Si non trouvé, récupère le CSV directement depuis GitHub

2. *Recherche*
   - Utilise [PapaParse](https://www.papaparse.com/) pour parser le CSV
   - Crée un index avec [Fuse.js](https://fusejs.io/) pour la recherche floue
   - Renvoie les résultats à l’interface

3. *Modularité*
   - utils.js gère la normalisation du texte et l’expansion des requêtes
   - chatbot.js est un placeholder prêt pour les futurs pipelines NLP

## Démarrage (Local)

1. Cloner ou télécharger le projet
2. Ouvrir index.html dans un navigateur
3. Si SB_publication_PMC.csv existe localement, il sera chargé automatiquement
4. Sinon, l’application récupérera le CSV depuis GitHub

## Déploiement (GitHub Pages)

1. Pousser le projet sur un dépôt GitHub
2. Aller dans *Paramètres → Pages*
3. Sélectionner la branche (ex. main) et le dossier (/ racine)
4. Enregistrer et visiter l’URL publiée

## Améliorations futures

- Recherche sémantique avec synonymes et embeddings
- Pipeline Chatbot pour résumer les articles et répondre aux questions
- Support PWA (progressive web app) pour fonctionnement hors ligne

## Licence

Open-source NASA— libre de forker, améliorer et contribuer !


---
