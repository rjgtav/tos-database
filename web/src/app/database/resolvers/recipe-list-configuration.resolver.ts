import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration, TOSListTableColumnType} from "../entity-list/entity-list.component";
import {TOSRecipeMaterial} from "../../shared/domain/tos/item/recipe/tos-recipe.model";

@Injectable()
export class RecipeListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      sortColumn: '$ID',

      tableColumns: [
        { value: 'TargetAsList',    type: TOSListTableColumnType.ICON_LINK,       label: '' },
        { value: '$ID',             type: TOSListTableColumnType.TEXT,            isNotMobile: true },
        { value: 'Name',            type: TOSListTableColumnType.TEXT,            isWide: true},
        { value: 'Link_Materials',  type: TOSListTableColumnType.ICON_LINK_VALUE, label: 'Materials', isNotMobile: true,
          transformLink: (o: TOSRecipeMaterial) => o.Item, transformValue: (o: TOSRecipeMaterial) => o.Quantity },
      ]
    };
  }
}
