import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';

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

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router
  ) {}

  ngOnInit(){
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

    try {
      this.authService.login(this.userForm.value.email, this.userForm.value.password);
      this.router.navigate(['/']).catch(error => console.error('Navigation error', error));
    } catch (error) {
      console.error('Error during log-in:', error);
    }

  }
}
