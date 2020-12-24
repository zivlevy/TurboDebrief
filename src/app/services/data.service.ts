import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
    this.http.get('https://devserver.yamasee-skypath.com/v2/raw-data/metadata')
      .pipe(take(1))
      .subscribe(res => console.log(res));

    this.http.get('https://devserver.yamasee-skypath.com/v2/raw-data/metadata/' + '7958434e-2fd8-4fd3-9b0c-02da60bb69ef')
      .pipe(take(1))
      .subscribe(res => console.log(res));
    this.http.get<Blob>('https://devserver.yamasee-skypath.com/v2/raw-data/sensor_data/7958434e-2fd8-4fd3-9b0c-02da60bb69ef', { observe: 'response', responseType: 'blob' as 'json' })
      .pipe(take(1))
      .subscribe(res => console.log(res));


  }

}
