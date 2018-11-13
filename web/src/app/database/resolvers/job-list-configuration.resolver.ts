import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration, TOSListTableColumnType} from "../entity-list/entity-list.component";
import {TOSJobDifficulty, TOSJobTree} from "../../shared/domain/tos/tos-domain";

@Injectable()
export class JobListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filter: [
        {
          column: 'JobDifficulty',
          label: 'Difficulty',
          groups: [
            {
              options: [
                TOSJobDifficulty.EASY,
                TOSJobDifficulty.NORMAL,
                TOSJobDifficulty.HARD,
              ]
            }
          ]
        },
        {
          column: 'JobTree',
          label: 'Tree',
          groups: [
            {
              options: [
                TOSJobTree.ARCHER,
                TOSJobTree.CLERIC,
                TOSJobTree.SCOUT,
                TOSJobTree.WARRIOR,
                TOSJobTree.WIZARD,
              ]
            }
          ]
        },
      ],

      sortColumn: 'JobTree',

      tableColumns: [
        { value: 'Icon',            type: TOSListTableColumnType.ICON,      label: '' },
        { value: '$ID',             type: TOSListTableColumnType.TEXT,      isNotMobile: true },
        { value: 'Name',            type: TOSListTableColumnType.TEXT,      isWide: true},
        { value: 'CircleMax',       type: TOSListTableColumnType.TEXT,      label: 'Circles'},
        { value: 'JobDifficulty',   type: TOSListTableColumnType.TEXT,      label: 'Difficulty', isNotMobile: true},
        { value: 'Rank',            type: TOSListTableColumnType.TEXT,      },
        { value: 'JobTree',         type: TOSListTableColumnType.TEXT,      label: 'Tree'},
      ]
    };
  }
}
