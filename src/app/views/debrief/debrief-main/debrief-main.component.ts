import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'ym-debrief-main',
  templateUrl: './debrief-main.component.html',
  styleUrls: ['./debrief-main.component.scss'],
  providers: [MessageService]
})
export class DebriefMainComponent implements OnInit {
  isRawVisible = false;
  isTurbulenceVisible = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showTurbulence(): void {
    this.isTurbulenceVisible = true;
  }

  showRaw(): void {
    this.isRawVisible = true;
  }

  goHome(): void {
    this.router.navigate(['mainView']);
  }

}
