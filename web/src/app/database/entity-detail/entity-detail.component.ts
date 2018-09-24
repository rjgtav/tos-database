import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TOSItem} from "../../shared/domain/tos/item/tos-item.model";
import {TOSEntity} from "../../shared/domain/tos/entity/tos-entity.model";
import {TOSEquipment, TOSEquipmentSet} from "../../shared/domain/tos/item/equipment/tos-equipment.model";
import {TOSBook} from "../../shared/domain/tos/item/book/tos-book.model";
import {TOSCollection} from "../../shared/domain/tos/item/collection/tos-collection.model";
import {TOSMonster} from "../../shared/domain/tos/monster/tos-monster.model";
import {TOSRecipe} from "../../shared/domain/tos/item/recipe/tos-recipe.model";
import {Subscription} from "rxjs";
import {TOSCube} from "../../shared/domain/tos/item/cube/tos-cube.model";
import {TOSCard} from "../../shared/domain/tos/item/card/tos-card.model";
import {TOSGem} from "../../shared/domain/tos/item/gem/tos-gem.model";
import {EntityDetailClassIconGradeComponent} from "../../shared/components/entity-detail/entity-detail-ClassIconGrade/entity-detail-ClassIconGrade.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.scss']
})
export class EntityDetailComponent implements OnDestroy, OnInit {
  readonly ICON_WIDTH = EntityDetailClassIconGradeComponent.ICON_LARGE_WIDTH;

  entity: TOSEntity;

  book: TOSBook;
  collection: TOSCollection;
  card: TOSCard;
  cube: TOSCube;
  equipment: TOSEquipment;
  equipmentSet: TOSEquipmentSet;
  gem: TOSGem;
  item: TOSItem;
  monster: TOSMonster;
  recipe: TOSRecipe;

  anvilAvailable: boolean;
  anvilLevel: number = 0;
  transcendAvailable: boolean;
  transcendLevel: number = 0;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(({ response }) => {
      this.entity = response as TOSEntity;

      this.book = this.entity instanceof TOSBook ? this.entity as TOSBook : null;
      this.collection = this.entity instanceof TOSCollection ? this.entity as TOSCollection : null;
      this.card = this.entity instanceof TOSCard ? this.entity as TOSCard : null;
      this.cube = this.entity instanceof TOSCube ? this.entity as TOSCube : null;
      this.equipment = this.entity instanceof TOSEquipment ? this.entity as TOSEquipment : null;
      this.equipmentSet = this.entity instanceof TOSEquipmentSet ? this.entity as TOSEquipmentSet : null;
      this.gem = this.entity instanceof TOSGem ? this.entity as TOSGem : null;
      this.item = this.entity instanceof TOSItem ? this.entity as TOSItem : null;
      this.monster = this.entity instanceof TOSMonster ? this.entity as TOSMonster : null;
      this.recipe = this.entity instanceof TOSRecipe ? this.entity as TOSRecipe : null;

      if (this.equipment) {
        this.anvilAvailable = this.equipment.AnvilSilver(1) > 0;
        this.transcendAvailable = this.equipment.TranscendShards(1) > 0;
      }
      if (this.equipmentSet)
        this.router.navigate([this.equipmentSet.Link_Items[0].Url]);
    });
  }

}
