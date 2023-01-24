import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Patient } from 'src/app/models/pacient';
import { PatientsService } from './patients.service';

@Injectable({
  providedIn: 'root',
})
export class PacientResolver implements Resolve<Patient> {
  constructor(private patientsService: PatientsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Patient> {
    if (route.params && route.params['id']) {
      return this.patientsService.getById(route.params['id']);
    }

    return of({
      id: undefined,
      nome: '',
      genero: '',
      dataNascimento: '',
      cpf: '',
      rg: '',
      orgaoExpedidor: '',
      estadoCivil: '',
      telefone: '',
      contatoEmergencia: '',
      email: '',
      alergias: '',
      cuidadosEspecificos: '',
      naturalidade: '',
      convenio: {
        nome: '',
        numero: '',
        validade: '',
      },
      endereco: {
        cep: '',
        cidade: '',
        estado: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        referencia: '',
      },
    });
  }
}
