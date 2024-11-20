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
      // Ocultar la interfaz web para mostrar el escáner en pantalla completa
      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan(); // Inicia el escáner
      if (result.hasContent) {
        this.scanResult = result.content; // Pegar resultado en el input
      } else {
        console.log('No se detectó contenido en el código QR.');
      }

      // Mostrar la interfaz web nuevamente
      BarcodeScanner.showBackground();
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
