import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'ym-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getMetaDataList();
  }

  ngOnDestroy(): void {
    // force unsubscribe
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
