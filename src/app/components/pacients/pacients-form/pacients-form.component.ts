import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CepService } from 'src/app/shared/services/cep.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CPF_REGEX, PHONE_REGEX } from 'src/app/shared/utils/constants';
import { dateValidation } from 'src/app/shared/utils/date-validator';
import { PacientsService } from '../pacients.service';

@Component({
  selector: 'labmedical-pacients-form',
  templateUrl: './pacients-form.component.html',
  styleUrls: ['./pacients-form.component.scss'],
})
export class PacientsFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cepService: CepService,
    private pacientsService: PacientsService,
    public router: Router,
    private toastService: ToastService
  ) {
    this.form = this.formBuilder.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      genero: ['', Validators.required],
      dataNascimento: ['', [Validators.required, dateValidation('past')]],
      cpf: ['', [Validators.required, Validators.pattern(CPF_REGEX)]],
      rg: ['', [Validators.required, Validators.maxLength(20)]],
      orgaoExpedidor: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(PHONE_REGEX)]],
      contatoEmergencia: [
        '',
        [Validators.required, Validators.pattern(PHONE_REGEX)],
      ],
      email: ['', Validators.email],
      alergias: [''],
      cuidadosEspecificos: [''],
      naturalidade: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      convenio: this.formBuilder.group({
        nome: [''],
        numero: [''],
        validade: ['', dateValidation('future')],
      }),
      endereco: this.formBuilder.group({
        cep: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: ['', Validators.required],
        referencia: [''],
      }),
    });
  }

  isInvalid(input: string) {
    return this.form.get(input)?.invalid && this.form.get(input)?.touched;
  }

  onSubmit() {
    if (this.form.valid) {
      this.pacientsService.create(this.form.value).subscribe({
        next: (pacient) => {
          this.toastService.success('Paciente criado com sucesso!');
          this.router.navigate(['/paciente', pacient.id]);
        },
        error: () => this.toastService.error('Erro ao salvar paciente!'),
      });
    } else {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control?.markAllAsTouched();
      });
    }
  }

  getAddressByCep() {
    const cep = this.form.get('endereco.cep')?.value;

    this.cepService.getAddress(cep)?.subscribe((address) => {
      this.form.patchValue({
        endereco: {
          cep: address.cep,
          cidade: address.localidade,
          estado: address.uf,
          logradouro: address.logradouro,
          complemento: address.complemento,
          bairro: address.bairro,
        },
      });
    });
  }
}
