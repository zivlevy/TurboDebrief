import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'ym-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.login('e010002', 'skypath')
      .pipe(take(1))
      .subscribe(user => {
        console.log(user);
        this.router.navigate(['/']);

      })
  }

}
