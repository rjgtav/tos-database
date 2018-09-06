import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration, TOSListTableColumnType} from "../entity-list/entity-list.component";
import {TOSElement, TOSEntity} from "../../shared/domain/tos/entity/tos-entity.model";
import {TOSEquipmentMaterial} from "../../shared/domain/tos/item/equipment/tos-equipment.model";
import {TOSCard, TOSCardType} from "../../shared/domain/tos/item/card/tos-card.model";
import {TOSMonster, TOSMonsterRace} from "../../shared/domain/tos/monster/tos-monster.model";
import {TOSGemType} from "../../shared/domain/tos/item/gem/tos-gem.model";

@Injectable()
export class GemListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filter: [
        {
          column: 'TypeGem',
          label: 'Type',
          groups: [
            {
              options: [
                TOSGemType.SKILL,
                TOSGemType.STATS,
              ]
            }
          ]
        },
      ],

      sortColumn: '$ID',

      tableColumns: [
        { value: 'Icon',            type: TOSListTableColumnType.ICON,  label: '',
          transformIcon: TOSEntity.getIcon },
        { value: '$ID',             type: TOSListTableColumnType.TEXT,  isNotMobile: true },
        { value: 'Name',            type: TOSListTableColumnType.TEXT,  isWide: true},
        { value: 'TypeGem',         type: TOSListTableColumnType.TEXT,  label: 'Type' },
      ]
    };
  }
}
