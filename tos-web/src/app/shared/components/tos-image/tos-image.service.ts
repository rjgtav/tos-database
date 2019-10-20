import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, ReplaySubject} from "rxjs";
import {TOSUrlService} from "../../service/tos-url.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TOSImageService {

  private readonly index: ReplaySubject<INDEX> = new ReplaySubject<INDEX>();

  constructor(private http: HttpClient) {
    this.http
      .get<INDEX>(TOSUrlService.AssetRegion('ui/ui.json.js'))
      .subscribe(value => this.index.next(value));
  }

  get(id: string): Observable<TOSImage> {
    return this.index.pipe(map(value => {
      let sprite = value[id];
      let spriteParts = sprite && sprite.split(';');
      let spriteRect = spriteParts && spriteParts[1].split(' ');

      return {
        clipX: spriteRect && +spriteRect[0],
        clipY: spriteRect && +spriteRect[1],
        clipHeight: spriteRect && +spriteRect[2],
        clipWidth: spriteRect && +spriteRect[3],
        src: spriteParts && TOSUrlService.AssetRegion(`ui/${ spriteParts[0] }`),
      };
    }));
  }


}

type INDEX = { [key: string]: string }
type TOSImage = {
  clipX: number;
  clipY: number;
  clipHeight: number;
  clipWidth: number;
  src: string;
}
