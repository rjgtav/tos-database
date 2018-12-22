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
import {AttributeListConfigurationResolver} from "../resolvers/attribute-list-configuration.resolver";
import {CollectionListConfigurationResolver} from "../resolvers/collection-list-configuration.resolver";
import {GemListConfigurationResolver} from "../resolvers/gem-list-configuration.resolver";
import {ItemListConfigurationResolver} from "../resolvers/item-list-configuration.resolver";
import {JobListConfigurationResolver} from "../resolvers/job-list-configuration.resolver";
import {SkillListConfigurationResolver} from "../resolvers/skill-list-configuration.resolver";
import {RecipeListConfigurationResolver} from "../resolvers/recipe-list-configuration.resolver";
import {MonsterListConfigurationResolver} from "../resolvers/monster-list-configuration.resolver";
import {CubeListConfigurationResolver} from "../resolvers/cube-list-configuration.resolver";
import {EquipmentSetListConfigurationResolver} from "../resolvers/equipment-set-list-configuration.resolver";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.scss']
})
export class EntityDetailComponent implements OnDestroy, OnInit {
  readonly COLUMNS_ATTRIBUTES = AttributeListConfigurationResolver.COLUMNS;
  readonly COLUMNS_COLLECTIONS = CollectionListConfigurationResolver.COLUMNS;
  readonly COLUMNS_CUBES = CubeListConfigurationResolver.COLUMNS;
  readonly COLUMNS_GEMS = GemListConfigurationResolver.COLUMNS;
  readonly COLUMNS_ITEMS = ItemListConfigurationResolver.COLUMNS;
  readonly COLUMNS_ITEMS_DROPS = ItemListConfigurationResolver.COLUMNS_DROPS;
  readonly COLUMNS_JOBS = JobListConfigurationResolver.COLUMNS;
  readonly COLUMNS_RECIPES_MATERIALS = RecipeListConfigurationResolver.COLUMNS_MATERIALS;
  readonly COLUMNS_RECIPES = RecipeListConfigurationResolver.COLUMNS;
  readonly COLUMNS_SET = EquipmentSetListConfigurationResolver.COLUMNS;
  readonly COLUMNS_SKILLS = SkillListConfigurationResolver.COLUMNS;
  readonly COLUMNS_MONSTERS_DROPS = MonsterListConfigurationResolver.COLUMNS_DROPS;
  readonly COLUMNS_MONSTERS_SPAWNS = MonsterListConfigurationResolver.COLUMNS_SPAWNS;

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

  private subscriptionRoute: Subscription;
  private subscriptionSkill: Subscription;

  constructor(private changeDetector: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) { }

  ngOnDestroy() {
    this.subscriptionRoute && this.subscriptionRoute.unsubscribe();
    this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
  }

  ngOnInit() {
    this.subscriptionRoute = this.route.data.subscribe(({ response }) => {
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
        this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
        this.subscriptionSkill = this.skill.Link_Job.subscribe(async value => {
          let build = TOSDatabaseBuild.new(TOSRegionService.Region);
          await build.jobAdd$(value); // Note: we need to add them 3 times, as on pre-Re:Build the level max scales with the selected Job circle
          await build.jobAdd$(value);
          await build.jobAdd$(value);

          this.build = build;
          this.changeDetector.detectChanges();
        });
      }

      this.changeDetector.detectChanges();
      this.initialized = true;
    });
  }

}
