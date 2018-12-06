import {TOSRegion} from "../domain/tos-region";

const VERSION = {
  'iTOS': '230646001001', /* iTOS-needle */
  'jTOS': '230260001001', /* jTOS-needle */
  'kTOS': '228917001001', /* kTOS-needle */
  'kTEST': '231523001001', /* kTEST-needle */
};

export abstract class TOSUrlService {

  static Asset(region: TOSRegion, url: string): string {
    if (url.indexOf('data/') > -1) {
      url = url.replace('data/', 'data/' + (TOSRegion.toUrl(region) || this.region) + '/');
      url = url + '?version=' + VERSION[region];
    }

    return this.join(this.origin, url);
  }

  static Route(region: TOSRegion, url: string): string {
    return this.join('', this.join((TOSRegion.toUrl(region) || this.region), url));
  }

  private static join(url1: string, url2: string) {
    return url1 + ((url1.endsWith('/') || url2.startsWith('/')) ? '' : '/') + url2;
  }

  private static get origin(): string {
    let origin = location.origin + '/';
        origin = origin + (origin.indexOf('github.io') > 0 ? 'tos-database/' : '');

    return origin;
  }

  private static get region(): string {
    let part = location.href.slice(this.origin.length);
        part = part.slice(0, part.indexOf('/'));

    let region = TOSRegion.valueOf(part)|| TOSRegion.iTOS;

    return TOSRegion.toUrl(region);
  }

}
