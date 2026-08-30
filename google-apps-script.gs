/**
 * VoiceGuard — backend d'envoi d'email (Google Apps Script, gratuit)
 * Reçoit une requête du prototype et envoie DEUX emails distincts :
 *   1. Au visiteur testé : son récap (taux d'attaque, verdict, signaux détectés).
 *   2. À BRO_EMAIL (côté client, voiceguard final.html) : une alerte "prospect" —
 *      l'email du visiteur + ses résultats, à chaque test envoyé.
 *
 * ── DÉPLOIEMENT (5 min) ─────────────────────────────────────────────
 * 1. https://script.google.com  →  Nouveau projet
 * 2. Colle TOUT ce fichier dans Code.gs (remplace le contenu par défaut)
 * 3. Déployer  →  Nouveau déploiement  →  type "Application Web"
 *      - Exécuter en tant que : Moi
 *      - Qui a accès : Tout le monde   (obligatoire pour l'appel depuis le navigateur)
 * 4. Autoriser (Google demande l'accès à Gmail pour MailApp) — accepter
 * 5. Copie l'URL du Web App (finit par /exec)
 * 6. Colle cette URL dans "voiceguard final.html" :
 *      const VOICEGUARD_MAIL = { GAS_URL: "https://script.google.com/.../exec", BRO_EMAIL: "bro@email.com" };
 *      (BRO_EMAIL = l'adresse qui reçoit l'alerte prospect à chaque test — laisser vide pour désactiver)
 *
 * Quota MailApp compte Gmail perso : ~100 emails / jour (largement suffisant pour une démo).
 * Le prototype envoie en mode "no-cors" (fire-and-forget) : les emails partent, la page
 * n'attend pas de réponse — normal, pas besoin de renvoyer de CORS.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (!data.to) return _json({ ok: false, error: "missing recipient" });

    MailApp.sendEmail({
      to: data.to,
      subject: data.subject || "VoiceGuard",
      htmlBody: data.body || "",
      name: "VoiceGuard"
    });

    if (data.lead && data.lead.to) {
      MailApp.sendEmail({
        to: data.lead.to,
        subject: data.lead.subject || "VoiceGuard — nouveau prospect",
        htmlBody: data.lead.body || "",
        name: "VoiceGuard"
      });
    }

    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  }
}

// Simple ping pour vérifier que le déploiement répond (ouvrir l'URL /exec dans le navigateur)
function doGet() {
  return _json({ ok: true, service: "VoiceGuard mail", ts: new Date().toISOString() });
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
