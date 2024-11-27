import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { AsistenciaService } from '../services/asistencia.service';  // Importar el servicio

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.page.html',
  styleUrls: ['./qrscanner.page.scss'],
})
export class QrScannerPage {
  scanResult: string = '';

  constructor(
    private alertCtrl: AlertController,
    private asistenciaService: AsistenciaService  // Inyectar el servicio
  ) {}

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
      // Mostrar la cámara para previsualización
      console.log('Iniciando el escáner y mostrando la cámara...');
      document.querySelector('body')?.classList.add('scanner-active');
      await BarcodeScanner.hideBackground(); // Oculta el fondo para mejorar la visualización de la cámara

      // Asegúrate de que la cámara esté visible en el contenedor
      const cameraContainer = document.getElementById('camera-container');
      if (cameraContainer) {
        await BarcodeScanner.startScan();
        BarcodeScanner.showBackground(); // Vuelve a mostrar el fondo
      }

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
    } catch (error) {
      console.error('Error al escanear:', error);
    }
  }

  // Método para mostrar la alerta de permisos
  async showPermissionAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Permiso requerido',
      message: 'La aplicación necesita acceso a la cámara para escanear códigos QR.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Método para registrar la asistencia
  registrarAsistencia() {
    if (this.scanResult) {
      this.asistenciaService.registrarAsistencia(this.scanResult).subscribe(
        (response) => {
          this.showAlert('Asistencia registrada con éxito', response.message);
        },
        (error) => {
          this.showAlert('Error al registrar asistencia', error);
        }
      );
    } else {
      this.showAlert('Error', 'No se ha escaneado ningún código QR');
    }
  }

  // Método para mostrar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Método para detener el escaner al abandonar la pagina
  ionViewWillLeave() {
    // Detener el escáner y restaurar el fondo
    BarcodeScanner.stopScan();  // Detener el escáner
    BarcodeScanner.showBackground(); // Restaurar el fondo
    document.querySelector('body')?.classList.remove('scanner-active');  // Eliminar la clase de fondo transparente
  }
}
