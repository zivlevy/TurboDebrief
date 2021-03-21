import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'ym-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  /************* destroy **************/
  ngOnDestroy(): void {
    // force unsubscribe
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
