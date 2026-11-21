@echo off
echo ========================================================
echo   WaveDrop - Transfert Son, Lumiere et Vibration
echo ========================================================
echo [*] Demarrage du serveur HTTP sur le port 8099...
start "" "http://localhost:8099"
node server.js
pause
