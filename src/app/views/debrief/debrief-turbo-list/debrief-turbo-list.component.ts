import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {DataService} from '../../../services/data.service';
import {RawDataItem, RawDataResponse, Turbulence} from '../../../Model/MetaData';

@Component({
  selector: 'ym-debrief-turbo-list',
  templateUrl: './debrief-turbo-list.component.html',
  styleUrls: ['./debrief-turbo-list.component.scss']
})
export class DebriefTurboListComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  loading = false;
  items: Turbulence[] = [];
  cols = [];
  tableHeight = 'calc(100vh - 143px)';
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCurrentDebridf$()
      .pipe(
        takeUntil(this.destroy$),
        filter(res => res !== null)
      )
      .subscribe((debrief: RawDataResponse) => {
        this.items = [...debrief.turbulences];
      });

    // table cols
    this.cols = [
      {field: 'ts', filter: true, header: 'ts', width: '100px'},
      // {field: 'airplane', filter: true, header: 'airplane', width: '10%'},
      // {field: 'alt', filter: true, header: 'alt', width: '10%'},
      {field: 'altitude', filter: true, header: 'altitude', width: '50px'},
      // {field: 'fNum', filter: true, header: 'fNum', width: '10%'},
      // {field: 'lat', filter: true, header: 'lat', width: '10%'},
      // {field: 'lng', filter: true, header: 'lng', width: '10%'},
      {field: 'simulated', filter: true, header: 'simulated', width: '10%'},
      {field: 'sev', filter: true, header: 'sev', width: '40px'},
      {field: 'x', filter: true, header: 'x', width: '40px'},
      {field: 'y', filter: true, header: 'y', width: '40px'},
    ];
  }

  turbolenceSelected(turbulence): void {
    this.dataService.setSelectedTurbulence(turbulence);
    console.log(turbulence);
  }

  ngOnDestroy(): void {
    // force unsubscribe
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
