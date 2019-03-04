import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class TinyUrlService {

  constructor(private http: HttpClient) { }

  create(url: string): Observable<string> {
    let params = new HttpParams().set('url', url);
    return this.http
      .get(CORS_PROXY + 'https://tinyurl.com/api-create.php', { params, responseType: 'text' })
      .pipe(map(value => (value + '').split('http://tinyurl.com/')[1]));
  }

  parse(id: string): Observable<any> {
    return this.http
      .get(CORS_PROXY + 'https://preview.tinyurl.com/' + id, { responseType: 'text' })
      .pipe(map(value => {
        let html = document.createElement( 'html' );
            html.innerHTML = value;

        let url = html.getElementsByTagName('blockquote')[0].innerText;
            url = url.split(/\r?\n/).join('');

        return url;
      }));
  }

}
