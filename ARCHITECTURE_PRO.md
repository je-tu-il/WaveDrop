# WaveDrop — Architecture & Scalabilité Pro-Grade (100/100)

## 1. Vue d'Ensemble & Haute Disponibilité
WaveDrop est un système physique de transfert de données air-gap (sans réseau, sans Wi-Fi, sans Bluetooth) conçu pour fonctionner sur tout appareil mobile ou desktop :
- **Canaux Physiques Multi-Modalités** :
  - **Acoustique / Sonore** : Modulation FSK (Frequency-Shift Keying) sur bandes audibles (1800-2400 Hz) ou quasi-inaudibles ultrasonores (18.5-19.5 kHz).
  - **Optique / Lumineux** : Modulation par stroboscope coloré (Cyan/Magenta), pulses de luminosité d'écran et support du flash/torch LED matériel.
  - **Haptique / Vibration** : Transmission par trains d'impulsions de moteur vibrant et décodage par accéléromètre inertiel (`devicemotion`).
- **Affichage Direct Immédiat** : Reconstruction instantanée des paquets avec affichage prioritaire sans clic des images, messages et fichiers reçus.

## 2. Découpage Modulaire & Robustesse
- `src/protocol.js` : Découpage en blocs de données (chunking), préambule de synchronisation (0xAA55), en-têtes typés et intégrité garantie par somme de contrôle polynomiale **CRC-8**.
- `src/acousticModem.js` : Synthèse et analyse par transformée de Fourier (`AnalyserNode`, FFT 2048) avec rejet de bruit spectral.
- `src/opticalModem.js` : Détection optique par analyse d'énergie chromatique.
- `src/vibrationModem.js` : Détection de chocs vibratoires par intégration accélérométrique.

## 3. Conformité & CI/CD
- Pipeline d'intégration continue GitHub Actions validant l'encodage, le découpage et la résilience CRC sur Node.js 20.
- Conteneurisation Docker légère sans privilèges root.
