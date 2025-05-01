import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../../../core/services/auth.service';
import {Subscription} from 'rxjs';

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
export class SignUpComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  currentUser: any = null;
  userSubscription!: Subscription;
  isLoading = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.getAuthState().subscribe(user => {
      this.currentUser = user
      this.isLoading = false;
    });

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

    this.authService.register(
      this.userForm.value.email,
      this.userForm.value.password1,
      {name: this.userForm.value.name, phone: this.userForm.value.phone, birthDate: this.userForm.value.birthDate}
      ).then(() => {
      this.router.navigate(['/']).catch(error => console.error('Navigation error', error))
    }).catch(error => {
      console.error('Error during sign-in:', error);
      let errorMsg = 'Sign-in error, please try again.';
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/email-already-in-use':
          errorMsg = 'Email already in use.';
          break;
        case 'auth/operation-not-allowed':
          errorMsg = 'Operation not allowed, please log out first.';
          break;
        case 'auth/too-many-requests':
          errorMsg = 'Too many requests, try again later.';
          break;
      }
      this.userForm.setErrors({registrationError: errorMsg});
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
