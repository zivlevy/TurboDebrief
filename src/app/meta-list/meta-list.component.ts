import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {DataService} from '../services/data.service';
import {RawDataItem} from '../Model/MetaData';
import {filter, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'ym-meta-list',
  templateUrl: './meta-list.component.html',
  styleUrls: ['./meta-list.component.scss']
})
export class MetaListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  loading = false;
  metaRows: RawDataItem[] = [];
  cols = [];
  tableHeight = 'calc(100vh - 143px)';
  constructor(private dataService: DataService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.dataService.getCurrentMetaList$()
      .pipe(
        takeUntil(this.destroy$))
      .subscribe((res: RawDataItem[]) => {
        console.log(res);
        res = res.sort((a, b) => (a.metadata.start_ts > b.metadata.start_ts ? -1 : 1));
        this.metaRows = res;
      });

    // table cols
    this.cols = [
      {field: 'metadata.start_ts', filter: true, header: 'start', width: '10%'},
      {field: 'metadata.end_ts', filter: true, header: 'end', width: '10%'},
      {field: 'metadata.label', filter: true, header: 'Trigger', width: '10%'},
      {field: 'metadata.flight_num', filter: true, header: 'Flight', width: '10%'},
      {field: 'user_id', filter: true, header: 'User', width: '10%'},
      {field: 'metadata.user_response.confirmed', filter: true, header: 'User Confirm', width: '10%'},
      {field: 'metadata.user_response.suggested_level', filter: true, header: 'Suggested level', width: '10%'},
    ];
  }

  showData(row): void {
    this.dataService.setCurrentRow(row.uuid);
    this.router.navigate(['debrief']);
  }

  /************* destroy **************/
  ngOnDestroy(): void {
    // force unsubscribe
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
