import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSEquipmentGrade, TOSEquipmentType} from "../../shared/domain/tos/item/equipment/tos-equipment.model";
import {TOSListConfiguration, TOSListTableType} from "../item-list/item-list.component";

@Injectable()
export class EquipmentArmorListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filterColumn: 'TypeEquipment',
      filterGroups: [
        {
          label: 'Armor',
          values: [
            TOSEquipmentType.BRACELET,
            TOSEquipmentType.GLOVES,
            TOSEquipmentType.NECKLACE,
            TOSEquipmentType.BOTTOM,
            TOSEquipmentType.TOP,
            TOSEquipmentType.SHOES,
          ]
        },
      ],

      sortColumn: '$ID',

      tableColumns: [
        { value: 'Icon',          type: TOSListTableType.ICON,  width: 1, label: '', class: 'p-1' },
        { value: '$ID',           type: TOSListTableType.TEXT,  width: 1 },
        { value: 'Name',          type: TOSListTableType.TEXT,  },
        { value: 'Grade',         type: TOSListTableType.BADGE, width: 1, transform: TOSEquipmentGrade.getColor },
        { value: 'RequiredLevel', type: TOSListTableType.TEXT,  width: 1, label: 'Level' },
        { value: 'TypeEquipment', type: TOSListTableType.TEXT,  width: 1, label: 'Type' },
      ]
    };
  }
}
