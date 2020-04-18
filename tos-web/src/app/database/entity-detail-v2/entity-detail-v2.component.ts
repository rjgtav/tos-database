import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ITOSEntityV2} from "../../shared/domain/tos/tos-domain";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {V2TOSEntityProxy} from "../../shared/domain/tos/v2-tos-entity.proxy";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {ClipboardService} from "../../shared/service/clipboard.service";
import {EntityDetailV2$Deprecated} from "../resolvers/tos-entity.resolver";
import {EntityDetailV2Divider} from "./entity-detail-v2-divider/entity-detail-v2-divider.component";
import {EntityDetailV2EntityDescription} from "./entity-detail-v2-entity-description/entity-detail-v2-entity-description.component";
import {EntityDetailV2EquipmentEnhancement} from "./entity-detail-v2-equipment-enhancement/entity-detail-v2-equipment-enhancement.component";
import {EntityDetailV2} from "./entity-detail-v2.model";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-detail-v2',
  templateUrl: './entity-detail-v2.component.html',
  styleUrls: ['./entity-detail-v2.component.scss']
})
export class EntityDetailV2Component<ENTITY extends ITOSEntityV2> implements OnInit, OnDestroy {

  readonly faLink = faLink;

  detail: EntityDetailV2$Deprecated<ENTITY>;

  private subscriptionEntity: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private clipboard: ClipboardService,
    private route: ActivatedRoute,
  ) {
    this.detail = this.route.snapshot.data.detail;
  }

  get isLoading() { return this.detail.entity == null || this.detail.entity instanceof V2TOSEntityProxy; }

  isDetailDivider(config: EntityDetailV2<ENTITY>) { return config instanceof EntityDetailV2Divider }
  isDetailEntityDescription(config: EntityDetailV2<ENTITY>) { return config instanceof EntityDetailV2EntityDescription }
  isDetailEquipmentEnhancement(config: EntityDetailV2<ENTITY>) { return config instanceof EntityDetailV2EquipmentEnhancement }

  ngOnInit(): void {
    this.route.data.subscribe(value => {
      this.detail = value.detail as EntityDetailV2$Deprecated<ENTITY>;

      if (this.detail.entity instanceof V2TOSEntityProxy) {
        this.subscriptionEntity && this.subscriptionEntity.unsubscribe();
        this.subscriptionEntity = this.detail.entity.get().subscribe(value => this.onEntityLoad(value));
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptionEntity && this.subscriptionEntity.unsubscribe();
  }

  onEntityLoad(entity: ENTITY) {
    this.detail.entity = entity;
    this.changeDetector.markForCheck();
  }

  onShareClick(tooltip: NgbTooltip) {
    this.clipboard.write(location.href);
    tooltip.open();
  }

}
