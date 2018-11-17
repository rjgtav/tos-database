import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration, TOSListTableColumnType} from "../entity-list/entity-list.component";
import {TOSEquipmentGrade, TOSEquipmentMaterial, TOSEquipmentType} from "../../shared/domain/tos/tos-domain";

@Injectable()
export class EquipmentListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filter: [
        {
          column: 'Grade',
          groups: [
            {
              options: [
                TOSEquipmentGrade.NORMAL,
                TOSEquipmentGrade.MAGIC,
                TOSEquipmentGrade.RARE,
                TOSEquipmentGrade.UNIQUE,
                TOSEquipmentGrade.LEGENDARY,
              ]
            }
          ]
        },
        {
          column: 'Material',
          groups: [
            {
              options: [
                TOSEquipmentMaterial.CLOTH,
                TOSEquipmentMaterial.GHOST,
                TOSEquipmentMaterial.LEATHER,
                TOSEquipmentMaterial.PLATE,
              ]
            }
          ]
        },
        {
          column: 'TypeEquipment',
          label: 'Type',
          groups: [
            {
              header: 'Armor',
              options: [
                TOSEquipmentType.BRACELET,
                TOSEquipmentType.GLOVES,
                TOSEquipmentType.NECKLACE,
                TOSEquipmentType.BOTTOM,
                TOSEquipmentType.TOP,
                TOSEquipmentType.SHOES,
              ]
            },
            {
              header: 'Fashion',
              options: [
                TOSEquipmentType.COSTUME_ARMBAND,
                TOSEquipmentType.COSTUME_EFFECT,
                TOSEquipmentType.COSTUME_HAIR,
                TOSEquipmentType.COSTUME_HAIR_ACCESSORY,
                TOSEquipmentType.COSTUME_HELMET,
                TOSEquipmentType.COSTUME_LENS,
                TOSEquipmentType.COSTUME_OUTFIT,
                TOSEquipmentType.COSTUME_SPECIAL,
                TOSEquipmentType.COSTUME_TOY,
                TOSEquipmentType.COSTUME_WING,
              ]
            },
            {
              header: '1-Handed Weapons',
              options: [
                TOSEquipmentType.ONE_HANDED_BOW,
                TOSEquipmentType.ONE_HANDED_MACE,
                TOSEquipmentType.RAPIER,
                TOSEquipmentType.ONE_HANDED_STAFF,
                TOSEquipmentType.ONE_HANDED_SPEAR,
                TOSEquipmentType.ONE_HANDED_SWORD,
              ]
            },
            {
              header: '2-Handed Weapons',
              options: [
                TOSEquipmentType.TWO_HANDED_BOW,
                TOSEquipmentType.TWO_HANDED_MACE,
                TOSEquipmentType.TWO_HANDED_GUN,
                TOSEquipmentType.TWO_HANDED_SPEAR,
                TOSEquipmentType.TWO_HANDED_STAFF,
                TOSEquipmentType.TWO_HANDED_SWORD,
              ]
            },
            {
              header: 'Sub Weapons',
              options: [
                TOSEquipmentType.CANNON,
                TOSEquipmentType.DAGGER,
                TOSEquipmentType.ONE_HANDED_GUN,
                TOSEquipmentType.SHIELD,
              ]
            },
            {
              header: 'Seals',
              options: [
                TOSEquipmentType.SEAL,
              ]
            },
          ],
        }
      ],

      sortColumn: '$ID',

      tableColumns: [
        { value: 'Icon',          type: TOSListTableColumnType.ICON,        label: '' },
        { value: '$ID',           type: TOSListTableColumnType.TEXT,        isNotMobile: true },
        { value: 'Name',          type: TOSListTableColumnType.TEXT,        isWide: true },
        { value: 'Material',      type: TOSListTableColumnType.TEXT,        isNotMobile: true },
        { value: 'Grade',         type: TOSListTableColumnType.BADGE,
          transformColor: TOSEquipmentGrade.getColor },
        { value: 'RequiredLevel', type: TOSListTableColumnType.TEXT_NUMBER, label: 'Level' },
        { value: 'TypeEquipment', type: TOSListTableColumnType.TEXT,        isNotMobile: true, label: 'Type' },
      ]
    };
  }
}
