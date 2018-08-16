import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSEquipmentGrade, TOSEquipmentType} from "../../shared/domain/tos/item/equipment/tos-equipment.model";
import {TOSListConfiguration, TOSListTableType} from "../item-list/item-list.component";

@Injectable()
export class EquipmentWeaponListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filterColumn: 'TypeEquipment',
      filterGroups: [
        {
          label: '1-Handed Weapons',
          values: [
            TOSEquipmentType.ONE_HANDED_BOW,
            TOSEquipmentType.ONE_HANDED_MACE,
            TOSEquipmentType.RAPIER,
            TOSEquipmentType.ONE_HANDED_STAFF,
            TOSEquipmentType.ONE_HANDED_SPEAR,
            TOSEquipmentType.ONE_HANDED_SWORD,
          ]
        },
        {
          label: '2-Handed Weapons',
          values: [
            TOSEquipmentType.TWO_HANDED_BOW,
            TOSEquipmentType.TWO_HANDED_MACE,
            TOSEquipmentType.TWO_HANDED_GUN,
            TOSEquipmentType.TWO_HANDED_SPEAR,
            TOSEquipmentType.TWO_HANDED_STAFF,
            TOSEquipmentType.TWO_HANDED_SWORD,
          ]
        },
        {
          label: 'Sub Weapons',
          values: [
            TOSEquipmentType.CANNON,
            TOSEquipmentType.DAGGER,
            TOSEquipmentType.ONE_HANDED_GUN,
            TOSEquipmentType.SHIELD,
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
