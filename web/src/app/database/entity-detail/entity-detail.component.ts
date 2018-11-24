import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TOSItem} from "../../shared/domain/tos/item/tos-item.model";
import {TOSEntity} from "../../shared/domain/tos/tos-entity.model";
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
import {TOSAttribute} from "../../shared/domain/tos/attribute/tos-attribute.model";
import {TOSSkill} from "../../shared/domain/tos/skill/tos-skill.model";
import {TOSDatabaseBuild} from "../../shared/domain/tos/tos-build";
import {TOSJob} from "../../shared/domain/tos/job/tos-job.model";
import {TOSRegionService} from "../../shared/service/tos-region.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.scss']
})
export class EntityDetailComponent implements OnDestroy, OnInit {
  readonly ICON_WIDTH = EntityDetailClassIconGradeComponent.ICON_LARGE_WIDTH;

  build: TOSDatabaseBuild;
  entity: TOSEntity;

  attribute: TOSAttribute;
  book: TOSBook;
  collection: TOSCollection;
  card: TOSCard;
  cube: TOSCube;
  equipment: TOSEquipment;
  equipmentSet: TOSEquipmentSet;
  gem: TOSGem;
  item: TOSItem;
  job: TOSJob;
  monster: TOSMonster;
  recipe: TOSRecipe;
  skill: TOSSkill;

  anvilLevel: number = 0;
  initialized: boolean;
  transcendLevel: number = 0;

  tooltip: TOSEntity;

  private subscription: Subscription;

  constructor(private changeDetector: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(({ response }) => {
      this.entity = response as TOSEntity;

      this.attribute = this.entity instanceof TOSAttribute ? this.entity as TOSAttribute : null;
      this.book = this.entity instanceof TOSBook ? this.entity as TOSBook : null;
      this.collection = this.entity instanceof TOSCollection ? this.entity as TOSCollection : null;
      this.card = this.entity instanceof TOSCard ? this.entity as TOSCard : null;
      this.cube = this.entity instanceof TOSCube ? this.entity as TOSCube : null;
      this.equipment = this.entity instanceof TOSEquipment ? this.entity as TOSEquipment : null;
      this.equipmentSet = this.entity instanceof TOSEquipmentSet ? this.entity as TOSEquipmentSet : null;
      this.gem = this.entity instanceof TOSGem ? this.entity as TOSGem : null;
      this.item = this.entity instanceof TOSItem ? this.entity as TOSItem : null;
      this.job = this.entity instanceof TOSJob ? this.entity as TOSJob : null;
      this.monster = this.entity instanceof TOSMonster ? this.entity as TOSMonster : null;
      this.recipe = this.entity instanceof TOSRecipe ? this.entity as TOSRecipe : null;
      this.skill = this.entity instanceof TOSSkill ? this.entity as TOSSkill : null;

      if (this.skill) {
        this.build = TOSDatabaseBuild.new(TOSRegionService.Region);
        this.build.jobAdd(this.skill.Link_Job); // Note: we need to add them 3 times, as on pre-Re:Build the level max scales with the selected Job circle
        this.build.jobAdd(this.skill.Link_Job);
        this.build.jobAdd(this.skill.Link_Job);
      }

      this.initialized && this.changeDetector.detectChanges();
      this.initialized = true;
    });
  }

}
