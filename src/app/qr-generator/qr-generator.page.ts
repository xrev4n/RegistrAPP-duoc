import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.page.html',
  styleUrls: ['./qr-generator.page.scss'],
})
export class QrGeneratorPage implements OnInit {
  codigoQr: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener el código QR de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.codigoQr = params.get('codigo');
    });
  }
}
