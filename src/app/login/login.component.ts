import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {environment} from '../../environments/environment';

@Component({
  selector: 'ym-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  dynamicForm: FormGroup;
  submitted = false;

  version: string;
  msgs: any[];

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig) {

    this.dynamicForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.version = environment.version;
  }

  get f(): any {
    return this.dynamicForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }
    this.login();
  }

  login(): void {
    this.auth.login(this.f.email.value, this.f.password.value)
      .pipe(take(1))
      .subscribe(user => {
        console.log(user);
        this.router.navigate(['mainView']);
      }, error => {
        console.log(error);
        this.messageService.add({severity: 'error', summary: error.message, detail: error.message, sticky: true})
      });
  }


  ngOnDestroy(): void {
    // force unsubscribe
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
