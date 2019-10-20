import {TOSRegionService} from "../domain/tos-region";

export abstract class TOSUrlService {

  static Url(url: string): string {
    return this.join(this.origin, url.toLowerCase());
  }

  static Api(url: string): string {
    return this.Url(`api/${ url }`);
  }

  public static Asset(url: string, region: boolean = false): string {
    return region
      ? this.Url(`assets/region/${ TOSRegionService.toUrl() }/${ url }`)
      : this.Url(`assets/${ url }`);
  }
  public static AssetRegion(url: string): string {
    return TOSUrlService.Asset(url, true);
  }
  public static AssetWorker(url: string): string {
    return TOSUrlService.Asset(`worker/${ url }`, false);
  }

  static Route(url: string): string {
    return this.join('', this.join(TOSRegionService.toUrl(), url));
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
