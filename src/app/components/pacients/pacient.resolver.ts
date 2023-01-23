import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pacient } from 'src/app/shared/models/pacient';
import { PacientsService } from './pacients.service';

@Injectable({
  providedIn: 'root',
})
export class PacientResolver implements Resolve<Pacient> {
  constructor(private pacientsService: PacientsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pacient> {
    if (route.params && route.params['id']) {
      return this.pacientsService.getById(route.params['id']);
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
