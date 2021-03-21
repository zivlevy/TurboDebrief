import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, switchMap, take} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {MetaDataItem, RawData, RawDataItem, RawDataItemResponse, RawDataResponse} from '../Model/MetaData';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentList$: BehaviorSubject<RawDataItem[]> = new BehaviorSubject<RawDataItem[]>([]);
  currentDebrief$: BehaviorSubject<RawDataResponse> = new BehaviorSubject<RawDataResponse>(null);
  rawDataSelected$: BehaviorSubject<RawData[]> = new BehaviorSubject<RawData[]>(null);
  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:max-line-length variable-name
  getMetaDataList(limit?: number, page?: number, user_id?: string, from_date?: number, to_date?: number, start_ts?: number, end_ts?: number, label?: string, flight_num?: string): void {
    const queryParams = new HttpParams();
    if (limit) {
      queryParams.set('limit', '' + limit);
    }
    if (page) {
      queryParams.set('page', '' + page);
    }
    if (user_id) {
      queryParams.set('user_id', user_id);
    }
    if (from_date) {
      queryParams.set('from_date', '' + from_date);
    }
    if (to_date) {
      queryParams.set('to_date', '' + to_date);
    }
    if (start_ts) {
      queryParams.set('start_ts', '' + start_ts);
    }
    if (end_ts) {
      queryParams.set('end_ts', '' + end_ts);
    }
    if (label) {
      queryParams.set('label', '' + label);
    }
    if (flight_num) {
      queryParams.set('flight_num', '' + flight_num);
    }
    const options = {params: queryParams};


    this.http.get<RawDataItemResponse>('https://devserver.yamasee-skypath.com/v2/raw-data/metadata', options)
      .subscribe((res) => this.currentList$.next(res.data));

  }

  getMetaDataByID(id: string): Observable<any> {
    return this.http.get('https://devserver.yamasee-skypath.com/v2/raw-data/metadata/' + id)
      .pipe(take(1));
  }

  private getRawDataById(id: string): Observable<RawData[]> {
    return new Observable(observer => {
      this.http.get<Blob>('https://devserver.yamasee-skypath.com/v2/raw-data/sensor-data/' + id, {
        observe: 'response',
        responseType: 'blob' as 'json'
      })
        .pipe(take(1))
        .subscribe(res => {
          const fr = new FileReader();
          fr.onload = (e) => {
            console.log(e.target.result);
            observer.next(JSON.parse(e.target.result as string));
          };
          fr.readAsText(res.body);
        }, error => observer.error(error));
    });
  }

  getCurrentMetaList$(): Observable<RawDataItem[]> {
    return this.currentList$.asObservable();
  }

  setCurrentRow(id: string): void {
    this.setCurrentDebrief(null);
    this.getRawDataById(id)
      .subscribe(debrief => {
        console.log(debrief);
        this.setCurrentDebrief(debrief);
      });
  }

  /*********** current Debrief ***********/
  setCurrentDebrief(debrief): void {
    this.currentDebrief$.next(debrief);
  }

  getCurrentDebridf$(): Observable<RawDataResponse> {
    return this.currentDebrief$.asObservable();
  }
  /*********** rowdata selection ***********/
  setSelectedRawData(selectedRaws): void {
    this.rawDataSelected$.next(selectedRaws);
  }

  getSelectedRawData$(): Observable<RawData[]> {
    return this.rawDataSelected$.asObservable();
  }

  /*********** turbulence selection ***********/
  setSelectedTurbulence(turbulence): void {
   const arr =  this.currentDebrief$.getValue().rawData.filter(item => {
      return item.timeStampMiliseconds > (turbulence.ts * 1000 - 1000) && item.timeStampMiliseconds < (turbulence.ts * 1000 + 1000);
    });
    this.rawDataSelected$.next(arr);
  }


}
