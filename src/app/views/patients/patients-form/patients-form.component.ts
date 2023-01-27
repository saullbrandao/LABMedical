import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { CepService } from 'src/app/services/cep.service';
import { ToastService } from 'src/app/services/toast.service';
import { CPF_REGEX, PHONE_REGEX } from 'src/app/utils/constants';
import { dateValidator } from 'src/app/utils/date-validator';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'labmedical-patients-form',
  templateUrl: './patients-form.component.html',
  styleUrls: ['./patients-form.component.scss'],
})
export class PatientsFormComponent implements OnInit {
  patientId!: number;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cepService: CepService,
    private patientsService: PatientsService,
    public router: Router,
    public route: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.form = this.formBuilder.group({
      id: [null],
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      genero: ['', Validators.required],
      dataNascimento: ['', [Validators.required, dateValidator('past')]],
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
        validade: ['', dateValidator('future')],
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

  ngOnInit(): void {
    const patient: Patient = this.route.snapshot.data['patient'];

    if (patient?.id) {
      this.patientId = patient.id;
      this.form.patchValue({
        ...patient,
      });
    }
  }

  isInvalid(input: string) {
    return this.form.get(input)?.invalid && this.form.get(input)?.touched;
  }

  onSubmit() {
    const successMsg = this.form.value.id
      ? 'Paciente atualizado com sucesso!'
      : 'Paciente cadastrado com sucesso!';
    const errorMsg = this.form.value.id
      ? 'Erro ao atualizar informações do paciente, tente novamente.'
      : 'Erro ao cadastrar paciente, tente novamente.';

    if (this.form.valid) {
      this.patientsService.save(this.form.value).subscribe({
        next: (patient) => {
          this.toastService.success(successMsg);
          this.router.navigate(['/pacientes', patient.id]);
        },
        error: () => this.toastService.error(errorMsg),
      });
    } else {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control?.markAllAsTouched();
      });
    }
  }

  onDelete() {
    this.patientsService.delete(this.patientId).subscribe({
      next: () => {
        this.toastService.success('Paciente deletado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.toastService.error(error.message);
      },
    });
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
