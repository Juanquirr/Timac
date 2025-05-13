import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Subscription} from "rxjs";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['../register/register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink]
})
export class LoginPage implements OnInit, OnDestroy {
  userForm!: FormGroup;
  currentUser: any = null;
  userSubscription!: Subscription;
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
  ) {}

  ngOnInit(){
    // COMPROBAR QUE NO HAY NADIE LOGEADO

    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      console.log('This form is invalid');
      return;
    }
  }
  ngOnDestroy() {
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }

  handleLogout() {
    // LOGOUT CON AUTHSERVICE
  }

}
