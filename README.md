# 📡 WaveDrop — Air-Gap Physical Data Transfer

Système de transfert de données et fichiers sans contact (Air-Gap) entre 2 appareils via :
1. **Le Son** : Modulation FSK audible (1800-2400 Hz) ou ultrasonore inaudible (18.5-19.5 kHz).
2. **La Lumière** : Stroboscope couleur haute fréquence, impulsions de luminosité d'écran et flash LED.
3. **La Vibration** : Modulation haptique et décodage par accéléromètre (appareils posés dos à dos).

---

## ✨ Fonctionnalités Clés

- **Affichage Direct Immédiat** : Dès qu'une image est reçue en direct par son ou lumière, elle s'affiche instantanément au centre de l'écran sans manipulation.
- **Support Multi-Formats** : Texte direct, images et fichiers binaires avec découpage dynamique et contrôle d'intégrité **CRC-8**.
- **Laboratoire Loopback** : Test de validation en boucle locale intégré pour tester la chaîne d'encodage/décodage en 1 clic.
- **Mobile First & PWA** : Compatible avec tout smartphone moderne (Android / iOS) et ordinateurs.

---

## 🚀 Démarrage Rapide

Double-cliquer sur `Lancer_Projet.bat` ou exécuter :

```bash
node server.js
```

Ouvrir [http://localhost:8099](http://localhost:8099) sur vos deux téléphones ou sur votre PC.

---

## 🧪 Tests Unitaires

```bash
node --test tests/*.test.js
```
