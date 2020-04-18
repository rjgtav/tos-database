import {TOSRegionService} from "../domain/tos-region";
import {TOSLanguageService} from "../domain/tos-language";

export abstract class TOSUrlService {

  static Url(url: string): string {
    return this.join(this.origin, url);
  }

  static Api(url: string): string {
    return this.Url(`api/${ url }`);
  }
  static ApiData(id: number | string, table: string): string {
    // Note: whenever we update this url structure again, don't forget to also update in the tos-lua/src/wasm/lua-runtime-overrides.h > LUA_RUNTIME_OVERRIDES_HttpRequest
    return this.Api(`${ TOSRegionService.toUrl() }/data/${ TOSLanguageService.toUrl() }/${ table }/${ id }.js`);
  }

  static Asset(url: string, region: boolean = false): string {
    return region
      ? this.Url(`assets/region/${ TOSRegionService.toUrl() }/${ url }`)
      : this.Url(`assets/${ url }`);
  }
  static AssetRegion(url: string): string {
    return TOSUrlService.Asset(url, true);
  }
  static AssetWorker(url: string): string {
    return TOSUrlService.Asset(`worker/${ url }`, false);
  }

  static Route(url: string) { return this.join('', this.join(TOSRegionService.toUrl(), url)) }
  static RouteDatabase(url: string) { return this.Route(this.join('database', url)) }

  private static join(url1: string, url2: string) {
    return url1 + ((url1.endsWith('/') || url2.startsWith('/')) ? '' : '/') + url2;
  }

  private static get origin(): string {
    let origin = location.origin + '/';
        origin = origin + (origin.indexOf('github.io') > 0 ? 'tos-database/' : '');

    return origin;
  }

}
