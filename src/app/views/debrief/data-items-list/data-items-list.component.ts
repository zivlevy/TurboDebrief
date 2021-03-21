import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {RawData, RawDataResponse, Turbulence} from '../../../Model/MetaData';
import {DataService} from '../../../services/data.service';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ym-data-items-list',
  templateUrl: './data-items-list.component.html',
  styleUrls: ['./data-items-list.component.scss']
})
export class DataItemsListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  loading = false;
  items: RawData[] = [];
  cols = [];
  selectArr = [];
  tableHeight = 'calc(100vh - 143px)';

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getCurrentDebridf$()
      .pipe(
        takeUntil(this.destroy$),
        filter(res => res !== null)
      )
      .subscribe((debrief: RawDataResponse) => {
        this.items = [...debrief.rawData];
      });

    // table cols
    this.cols = [
      {field: 'timeStampMiliseconds', filter: true, header: 'ts', width: '100px'},
      {field: 'g', filter: true, header: 'g', width: '50px'},
      {field: 'location', filter: true, header: 'location', width: '40px'},
      {field: 'noise', filter: true, header: 'noise', width: '40px'},
      {field: 'position', filter: true, header: 'position', width: '40px'},
      {field: 'avgG', filter: true, header: 'avgG', width: '40px'},
    ];
  }

  selectionChange(): void {
    this.dataService.setSelectedRawData(this.selectArr);
  }

  ngOnDestroy(): void {
    this.dataService.setSelectedRawData([]);
    // force unsubscribe
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
