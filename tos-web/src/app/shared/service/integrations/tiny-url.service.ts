import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TinyUrlService {

  constructor(private http: HttpClient) { }

  create(url: string): Observable<string> {
    return this.http
      .post('/api/tinyurl/create', { url }, { responseType: 'text' })
      .pipe(map(value => (value + '').split('http://tinyurl.com/')[1]));
  }

  parse(id: string): Observable<any> {
    return this.http
      .get('/api/tinyurl/get', { params: { id }, responseType: 'text' });
  }

}
