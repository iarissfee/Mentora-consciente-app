# Firebase security deployment

The Firestore client is protected by `firestore.rules`.

Deploy the rules after authenticating Firebase CLI:

```powershell
npx.cmd --yes firebase-tools login
npx.cmd --yes firebase-tools deploy --only firestore:rules --project mentora-consciente
```

For App Check, register the web app in Firebase Console > App Check using reCAPTCHA Enterprise (preferred for new integrations) or reCAPTCHA v3. Put only the public site key in `app-check-config.js`, deploy the web app, verify App Check metrics, and then enable enforcement for Cloud Firestore. Never commit the reCAPTCHA secret key.
