import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {RawData, RawDataResponse, Turbulence} from '../../../Model/MetaData';
import {DataService} from '../../../services/data.service';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ym-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  items: RawData[] = [];
  data: any = [];
  th1 = 0.038
  th2 = 0.1
  th3 = 0.22
  th4  = 0.5
  th5  = 1.0
  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getSelectedRawData$()
      .pipe(
        takeUntil(this.destroy$),
        filter(res => res !== null)
      )
      .subscribe((debrief: RawData[]) => {
        this.items = [...debrief];
        const y = [];
        const x = [];
        const th1 = []
        const th2 = []
        const th3 = []
        const th4 = []
        const th5 = []
        this.items.forEach(item => {
          x.push(item.timeStampMiliseconds);
          y.push(item.g);
          th1.push(item.avgG + this.th1)
          th2.push(item.avgG + this.th2)
          th3.push(item.avgG + this.th3)
          th4.push(item.avgG + this.th4)
          th5.push(item.avgG + this.th5)
        });
        this.data = {
          labels: [...x],
          datasets: [
            {
              data: [...y],
              fill: false,
            },            {
              data: [...th1],
              fill: false,
              borderColor: 'rgba(14 , 255 , 0 ,0.3)',
              pointRadius: 0
            },            {
              data: [...th2],
              fill: false,
              borderColor: 'rgba(242 , 255 , 12 ,0.3)',
              pointRadius: 0
            },            {
              data: [...th3],
              fill: false,
              borderColor: 'rgba(255 , 166 , 0 ,0.3)',
              pointRadius: 0
            },            {
              data: [...th4],
              fill: false,
              borderColor: 'rgba(250 , 0 , 0 ,0.3)',
              pointRadius: 0
            },            {
              data: [...th5],
              fill: false,
              borderColor: 'rgba(255 , 0 , 195 ,0.3)',
              pointRadius: 0
            }
          ]
        };
      });


  }

  ngOnDestroy(): void {
    // force unsubscribe
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
