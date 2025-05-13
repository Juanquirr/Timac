import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {
  userForm!: FormGroup;
  currentUser: any = null;
  isLoading = true;
  userSubscription = Subscription;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    // AQUÍ VA LA COMPROBACIÓN DEL USUARIO

    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(32)]],
      phone: ['', [Validators.pattern('[0-9]*$'), Validators.minLength(9), Validators.maxLength(9)]],
      birthDate: ['2000-01-01'],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(form: FormGroup){
    if(form.get('password1')?.value === form.get('password2')?.value){
      return null;
    } else {
      return {passwordMismatch: true};
    }
  }

  onSubmit(){
    if(this.userForm.invalid){
      console.log('This form is invalid');
      return;
    }

    // LOGICA DE REGISTER

  }

  handleLogout(){
    // LLAMAR AL AUTHSERVICE PARA LOGOUT
    console.log('Logout');
  }
}
