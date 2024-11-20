import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.page.html',
  styleUrls: ['./qrscanner.page.scss'],
})
export class QrScannerPage {
  scanResult: string = '';

  constructor(private alertCtrl: AlertController) {}

  async checkPermissionAndScan() {
    try {
      // Verificar permisos
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (status.granted) {
        this.startScanner();
      } else if (status.denied) {
        this.showPermissionAlert();
      }
    } catch (error) {
      console.error('Error al verificar permisos:', error);
      this.showPermissionAlert();
    }
  }

  async startScanner() {
    try {
      // Mostrar la cámara para previsualización (cámara visible)
      console.log('Iniciando el escáner y mostrando la cámara...');
      document.querySelector('body')?.classList.add('scanner-active');

      // Asegúrate de que la cámara esté visible
      await BarcodeScanner.hideBackground(); // Mostrar la cámara y el fondo

      const result = await BarcodeScanner.startScan(); // Inicia el escáner

      // Verificar si se ha escaneado un código QR
      if (result.hasContent) {
        this.scanResult = result.content; // Pegar resultado en el input
        console.log('Código QR escaneado: ', this.scanResult);
      } else {
        console.log('No se detectó contenido en el código QR.');
      }
       // Después de terminar el escáner, quita la clase y muestra el fondo
       document.querySelector('body')?.classList.remove('scanner-active');
       BarcodeScanner.showBackground(); // Vuelve a mostrar el fondo
    } catch (error) {
      console.error('Error al escanear:', error);
    }
  }

  async showPermissionAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Permiso requerido',
      message: 'La aplicación necesita acceso a la cámara para escanear códigos QR.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
