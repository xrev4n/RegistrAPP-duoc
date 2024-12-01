import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para acceder a los parámetros de la URL
import { QRCodeComponent } from 'angularx-qrcode'; // Importa QRCodeComponent

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.page.html',
  styleUrls: ['./qr-generator.page.scss'],
})
export class QrGeneratorPage implements OnInit {
  codigoQr: string | null = null; // Esta variable almacenará el código QR recibido

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Accedemos a los parámetros de la URL para obtener el código QR
    this.route.paramMap.subscribe(params => {
      this.codigoQr = params.get('codigo'); // Obtenemos el parámetro 'codigo_qr' de la URL
    });
  }
}
