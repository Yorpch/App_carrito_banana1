import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  formularioTransaccion: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    // Definición de los campos y sus validaciones
    this.formularioTransaccion = this.formBuilder.group({
      monto: ['', [Validators.required, Validators.min(1)]],
      concepto: ['', Validators.required],
      metodoPago: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.formularioTransaccion.valid) {
      const payload = this.formularioTransaccion.value;
      
      this.apiService.enviarFormulario(payload).subscribe({
        next: (respuesta) => {
          console.log('Datos procesados correctamente por el servicio web:', respuesta);
          // Aquí puedes agregar un Toast o Alert de éxito
          this.formularioTransaccion.reset();
        },
        error: (error) => {
          console.error('Error de comunicación con el microservicio:', error);
        }
      });
    } else {
      console.log('El formulario contiene errores de validación.');
    }
  }
}