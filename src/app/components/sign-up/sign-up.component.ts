import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(32)]],
      phone: ['', [Validators.pattern('[0-9]*$'), Validators.minLength(9), Validators.maxLength(9)]],
      birthDate: ['2000-01-01'],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(form: FormGroup) {
    if(form.get('password1')?.value === form.get('password2')?.value) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }

  onSubmit() {
    if (this.userForm.invalid) {
      console.log('This form is invalid');
      return;
    }
    console.log('Valid form:', this.userForm.value);
    // HERE FIREBASE

  }

}
