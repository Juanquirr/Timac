import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Subscription} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(){
    this.userSubscription = this.authService.getAuthState().subscribe(user => {
      this.currentUser = user
      this.isLoading = false;
    });

    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(){
    if(this.userForm.invalid){
      console.log('This form is invalid');
      return;
    }

    console.log('Valid form for user: ', this.userForm.value.email);

    this.authService.login(this.userForm.value.email, this.userForm.value.password).then((userCredential) => {
      if (userCredential.user) {
        this.router.navigate(['/']).catch(error => console.error('Navigation error', error));
      }
    }).catch(error => {
      console.error('Error during log-in:', error);
      let errorMsg = 'Log-in error, please try again.';
      const errorCode = error.code;
      switch (errorCode){
        case 'auth/invalid-credential':
          errorMsg = 'Email or password incorrect.';
          break;
        case 'auth/too-many-requests':
          errorMsg = 'Too many requests, try again later.';
          break;
        case 'auth/user-disabled':
          errorMsg = 'This account is disabled.';
          break;
      }
      this.userForm.setErrors({ loginError: errorMsg });
    });
  }

  ngOnDestroy() {
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }

  handleLogout() {
    this.authService.logout().catch(error => console.error('Logout error: ', error));
  }
}
