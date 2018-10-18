import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration, TOSListTableColumnType} from "../entity-list/entity-list.component";
import {TOSElement, TOSEntity} from "../../shared/domain/tos/entity/tos-entity.model";
import {TOSSkill, TOSSkillRequiredStanceCompanion} from "../../shared/domain/tos/skill/tos-skill.model";
import {TOSMonster} from "../../shared/domain/tos/monster/tos-monster.model";

@Injectable()
export class SkillListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filter: [
        {
          column: 'RequiredStanceCompanion',
          label: 'Companion',
          groups: [
            {
              options: [
                TOSSkillRequiredStanceCompanion.YES,
                TOSSkillRequiredStanceCompanion.NO,
                TOSSkillRequiredStanceCompanion.BOTH,
              ]
            }
          ]
        },
        {
          column: 'Element',
          groups: [
            {
              options: [
                TOSElement.DARK,
                TOSElement.EARTH,
                TOSElement.FIRE,
                TOSElement.HOLY,
                TOSElement.ICE,
                TOSElement.LIGHTNING,
                TOSElement.MELEE,
                TOSElement.POISON,
                TOSElement.PSYCHOKINESIS,
              ]
            }
          ]
        },
        {
          column: 'IsEnchanter',
          label: 'Enchanter',
          groups: [
            {
              options: [
                true,
              ]
            }
          ]
        },
        {
          column: 'IsPardoner',
          label: 'Pardoner',
          groups: [
            {
              options: [
                true,
              ]
            }
          ]
        },
        {
          column: 'IsShinobi',
          label: 'Shinobi',
          groups: [
            {
              options: [
                true,
              ]
            }
          ]
        },
      ],

      sortColumn: '$ID',

      tableColumns: [
        { value: 'Icon',            type: TOSListTableColumnType.ICON,      label: '',
          transformIcon: TOSEntity.getIcon },
        { value: '$ID',             type: TOSListTableColumnType.TEXT,      isNotMobile: true },
        { value: 'Name',            type: TOSListTableColumnType.TEXT,      isWide: true},
        { value: 'RequiredCircle',  type: TOSListTableColumnType.TEXT,      label: 'Circle'},
        { value: 'Link_Job',        type: TOSListTableColumnType.ICON_LINK, label: 'Class',
          transformValue: (o) => o ? [o] : null },
      ]
    };
  }
}
