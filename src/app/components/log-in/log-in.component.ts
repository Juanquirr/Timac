import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-log-in',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './log-in.component.html',
  styleUrl: '../sign-up/sign-up.component.css' // Usa el mismo que el sign-up
})
export class LogInComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(){
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSumbit(){
    if(this.userForm.invalid){
      console.log('This form is invalid');
      return;
    }

    console.log('Valid form', this.userForm.value);
    // AQUÍ SE MANEJARÁN LOS DATOS CON FIREBASE

  }
}
