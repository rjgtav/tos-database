import {TOSRegion, TOSRegionService} from "./tos-region";

const KEY_LANGUAGE = 'language';

export enum TOSLanguage {
  English = 'English',
  German = 'German',
  Indonesian = 'Indonesian',
  Japanese = 'Japanese',
  Korean = 'Korean',
  Portuguese = 'Portuguese',
  Russian = 'Russian',
  Taiwanese = 'Taiwanese',
}

export namespace TOSLanguageService {

  let LANGUAGE: TOSLanguage = null;

  export function get() {
    if (LANGUAGE)
      return LANGUAGE;

    let region = TOSRegionService.get();
    let language = localStorage.getItem(KEY_LANGUAGE) as TOSLanguage || TOSLanguageService.values()[region][0];

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
      Indonesian: 'flag-id',
      Japanese: 'flag-jp',
      Korean: 'flag-kr',
      Portuguese: 'flag-br',
      Russian: 'flag-ru',
      Taiwanese: 'flag-tw',
    };

    // Note: flag URLs are defined in the header.component.scss
    return map[value];
  }

  export function toHuman(value: TOSLanguage): string {
    return value == TOSLanguage.Portuguese ? 'Portuguese (Brazil)' : value;
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
      iTOS: [TOSLanguage.English, TOSLanguage.German, TOSLanguage.Indonesian, TOSLanguage.Korean, TOSLanguage.Portuguese, TOSLanguage.Russian],
      jTOS: [TOSLanguage.Japanese, TOSLanguage.Korean],
      kTEST: [TOSLanguage.Korean],
      kTOS: [TOSLanguage.Korean],
      twTOS: [TOSLanguage.Taiwanese, TOSLanguage.Korean],
    };
  }

}
