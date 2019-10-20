import {TOSRegion, TOSRegionService} from "./tos-region";

const KEY_LANGUAGE = 'language';

export enum TOSLanguage {
  English = 'English',
  German = 'German',
  Japanese = 'Japanese',
  Korean = 'Korean',
  Portuguese = 'Portuguese',
  Taiwanese = 'Taiwanese',
}

export namespace TOSLanguageService {

  let LANGUAGE: TOSLanguage = null;

  export function byRegion(region: TOSRegion): TOSLanguage[] {
    // TODO: add remaining iTOS languages, add Korean to all regions
    switch (region) {
      case TOSRegion.iTOS:  return [TOSLanguage.English, TOSLanguage.Portuguese];
      case TOSRegion.jTOS:  return [TOSLanguage.Japanese];
      case TOSRegion.kTEST: return [TOSLanguage.Korean];
      case TOSRegion.kTOS:  return [TOSLanguage.Korean];
      case TOSRegion.twTOS: return [TOSLanguage.Taiwanese]
    }
  }

  export function get() {
    if (LANGUAGE)
      return LANGUAGE;

    let region = TOSRegionService.get();
    let language = localStorage.getItem(KEY_LANGUAGE) as TOSLanguage || TOSLanguageService.byRegion(region)[0];

    return LANGUAGE = language;
  }

  export function set(value: TOSLanguage) {
    localStorage.setItem(KEY_LANGUAGE, value);
    location.reload();
  }

  export function toFlag(value: TOSLanguage): string {
    let map: { [key in TOSLanguage]: string } = {
      English: 'flag-us',
      German: 'flag-de',
      Japanese: 'flag-jp',
      Korean: 'flag-kr',
      Portuguese: 'flag-br',
      Taiwanese: 'flag-tw',
    };

    return map[value];
  }

  export function toHuman(value: TOSLanguage): string {
    return value;
  }

  export function toUrl(value?: TOSLanguage): string {
    return (value || TOSLanguageService.get()).toString().toLowerCase();
  }

  export function valueOf(param: string): TOSLanguage {
    return Object
      .values(TOSLanguage)
      .find(value => toUrl(value) == param.toLowerCase());
  }

  export function values(): { [key in TOSRegion]: TOSLanguage[] } {
    return {
      iTOS: [TOSLanguage.English, TOSLanguage.German, TOSLanguage.Portuguese],
      jTOS: [TOSLanguage.Japanese],
      kTEST: [TOSLanguage.Korean],
      kTOS: [TOSLanguage.Korean],
      twTOS: [TOSLanguage.Taiwanese],
    };
  }

}
