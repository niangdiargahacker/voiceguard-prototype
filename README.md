# VoiceGuard — prototype

Prototype interactif pour le concours **Financial Security Team Project Contest** (piste "Outil de sécurité financière").

## Le concept

VoiceGuard est un outil qui analyse en temps réel les appels téléphoniques suspects (fraude par clonage vocal) et alerte l'utilisateur pendant l'appel, avant qu'il ne transfère de l'argent.

## Fichier

Tout est dans **`voiceguard_final.html`** — un seul fichier autonome (HTML + CSS + JS), aucune installation nécessaire. Double-cliquer dessus l'ouvre dans n'importe quel navigateur.

## Fonctionnalités déjà implémentées (fonctionnelles, pas juste visuelles)

- **Sélecteur de langue** RU / EN / FR (russe par défaut — langue du concours)
- **Simulation d'appel** avec 2 scénarios (faux banquier / faux proche en détresse) + indicateur de risque animé + forme d'onde audio
- **Mot de code familial** — vérification réelle
- **Analyseur de texte** — vraie détection de schémas de fraude en 3 langues (regex JS), pas un mock
- **Contacts de confiance** — ajout/notification simulée
- **Historique des appels** analysés pendant la session
- **Schéma d'architecture** de la solution (section "sous le capot")

## Ce qui est demandé pour le redesign

Le contenu, la logique JS et les textes (3 langues) sont **finalisés et ne doivent pas être modifiés** sans nous consulter — seule l'identité visuelle est ouverte à la refonte :

- Palette de couleurs (actuellement : fond sombre, bleu `#5B8CFF`, rouge/orange/vert pour les niveaux de risque)
- Typographie (actuellement Unbounded + Inter + JetBrains Mono via Google Fonts)
- Mise en page / espacements / animations
- Le mockup de téléphone peut être repensé visuellement

Toutes les couleurs sont en variables CSS (`:root`) en haut du fichier — facile à retravailler sans toucher au reste.

## Recevoir le bilan par email + alerte prospect (optionnel)

Après un appel simulé, l'utilisateur peut entrer son email dans le bilan pour recevoir son récap : **taux d'attaque (score)**, verdict, scénario et signaux de fraude détectés. En parallèle, chaque envoi déclenche une **alerte prospect** vers l'équipe : l'email du visiteur + ses résultats. Les deux emails passent par un **Google Apps Script** gratuit (`MailApp.sendEmail`).

Mise en place (5 min) : suivre les étapes en tête de [`google-apps-script.gs`](google-apps-script.gs), puis coller l'URL du Web App dans `voiceguard final.html` :

```js
const VOICEGUARD_MAIL = { GAS_URL: "https://script.google.com/.../exec", BRO_EMAIL: "bro@email.com" };
```

- `BRO_EMAIL` = adresse qui reçoit l'alerte prospect (email + score + scénario + signaux) à **chaque** test envoyé. Laisser vide pour désactiver.
- Fonctionne quand le fichier est **hébergé ou ouvert en local**. Dans l'aperçu Artifact le réseau est bloqué → le bouton affiche une erreur (normal).
- Tant que `GAS_URL` est vide, le bouton affiche « envoi non configuré » (aucun faux succès).

## Contact

Des questions sur le contenu ou la logique : contacter l'équipe avant de modifier le JS.
