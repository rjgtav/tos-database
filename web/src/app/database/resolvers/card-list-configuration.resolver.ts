import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration, TOSListTableColumnType} from "../entity-list/entity-list.component";
import {TOSElement, TOSEntity} from "../../shared/domain/tos/entity/tos-entity.model";
import {TOSCard, TOSCardType} from "../../shared/domain/tos/item/card/tos-card.model";
import {TOSMonsterRace} from "../../shared/domain/tos/monster/tos-monster.model";

@Injectable()
export class CardListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filter: [
        {
          column: 'TypeCard',
          label: 'Type',
          groups: [
            {
              options: [
                TOSCardType.ATTACK,
                TOSCardType.DEFENSE,
                TOSCardType.LEGENDARY,
                TOSCardType.REINFORCE,
                TOSCardType.STATS,
                TOSCardType.UTILITY,
              ]
            }
          ]
        },
      ],

      sortColumn: '$ID',

      tableColumns: [
        { value: 'Icon',            type: TOSListTableColumnType.ICON,  label: '' },
        { value: '$ID',             type: TOSListTableColumnType.TEXT,  isNotMobile: true },
        { value: 'Name',            type: TOSListTableColumnType.TEXT,  isWide: true},
        { value: 'MonsterElement',  type: TOSListTableColumnType.ICON,  label: 'Element', isNotMobile: true,
          transformIcon: (o: TOSCard) => TOSElement.getIcon(o.MonsterElement) },
        { value: 'MonsterRace',     type: TOSListTableColumnType.ICON,  label: 'Race', isNotMobile: true,
          transformIcon: (o: TOSCard) => TOSMonsterRace.getIcon(o.MonsterRace) },
        { value: 'TypeCard',        type: TOSListTableColumnType.TEXT,  label: 'Type' },
      ]
    };
  }
}
