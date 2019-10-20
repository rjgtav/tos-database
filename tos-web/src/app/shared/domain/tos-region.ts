export enum TOSRegion {
  iTOS = 'iTOS',
  jTOS = 'jTOS',
  kTEST = 'kTEST',
  kTOS = 'kTOS',
  twTOS = 'twTOS',
}

export type TOSRegionVersion = { [key in TOSRegion]: { version: string, rebuild: boolean } };
//export const VERSIONS: TOSRegionVersion = JSON.parse(document.getElementById('tos-region').innerText);

export namespace TOSRegionService {

  let REGION: TOSRegion = null;

  export function get() {
    if (REGION)
      return REGION;

    let region = Object
      .values(TOSRegion)
      .find(value => location.href.indexOf(`/${ toUrl(value) }/`) > -1) || TOSRegion.iTOS;

    return REGION = region;
  }

  export function isRebuild(value: TOSRegion) {
    return true;
  }

  export function set(region: TOSRegion) {
    // Update url
    let regionOld = `/${ toUrl(TOSRegionService.get()) }/`;
    let regionNew = `/${ toUrl(region) }/`;
    //console.log('region select', regionOld, regionNew, url)

    location.href = location.href.replace(regionOld, regionNew);
  }

  export function toFlag(value: TOSRegion): string {
    let map: { [key in TOSRegion]: string } = {
      iTOS: 'flag-world',
      jTOS: 'flag-jp',
      kTEST: 'flag-kr',
      kTOS: 'flag-kr',
      twTOS: 'flag-tw',
    };


    return map[value];
  }

  export function toHuman(value: TOSRegion): string {
    let map: { [key in TOSRegion]: string } = {
      iTOS: 'International',
      jTOS: 'Japan',
      kTEST: 'Korea (Test)',
      kTOS: 'Korea',
      twTOS: 'Taiwan',
    };

    return map[value];
  }

  export function toUrl(value?: TOSRegion): string {
    return (value || TOSRegionService.get()).toString().toLowerCase();
  }

  export function valueOf(param: string): TOSRegion {
    return Object
      .values(TOSRegion)
      .find(value => toUrl(value) == param.toLowerCase());
  }

  export function values(): TOSRegion[] {
    return Object.values(TOSRegion);
  }

}
