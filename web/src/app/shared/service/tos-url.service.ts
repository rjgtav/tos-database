import {TOSRegionService} from "../domain/tos-region";

export abstract class TOSUrlService {

  static readonly WORKER_DEXIE = () => TOSUrlService.Asset('assets/js/dexie.worker.js');
  static readonly WORKER_LUNR = () => TOSUrlService.Asset('assets/js/lunr.worker.js');
  static readonly WORKER_PAPAPARSE = () => TOSUrlService.Asset('assets/js/papaparse.worker.js');

  static Asset(url: string): string {
    if (url.indexOf('data/') > -1)
      url = url.replace('data/', 'data/' + TOSRegionService.getUrl() + '/');

    return this.join(this.origin, url);
  }

  static Route(url: string): string {
    return this.join('', this.join(TOSRegionService.getUrl(), url));
  }

  private static join(url1: string, url2: string) {
    return url1 + ((url1.endsWith('/') || url2.startsWith('/')) ? '' : '/') + url2;
  }

  private static get origin(): string {
    let origin = location.origin + '/';
        origin = origin + (origin.indexOf('github.io') > 0 ? 'tos-database/' : '');

    return origin;
  }

}
