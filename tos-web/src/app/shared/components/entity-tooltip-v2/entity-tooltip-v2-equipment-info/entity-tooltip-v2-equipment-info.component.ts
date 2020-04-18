import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {EntityTooltipV2, EntityTooltipV2Size} from "../entity-tooltip-v2.model";
import {
  ITOSItemEquipmentV2,
  ITOSItemEquipmentV2$BasicTooltipProp,
  ITOSItemEquipmentV2$BasicTooltipProp$Transcended,
  ITOSItemEquipmentV2$Prop$Tooltip,
  ITOSItemEquipmentV2$UseJob
} from "../../../domain/tos/tos-domain";
import {Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {faCube, faImage, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Preference3D, PreferenceService} from "../../../service/preference.service";
import {AsyncPipe} from "@angular/common";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-tooltip-v2-equipment-info',
  templateUrl: './entity-tooltip-v2-equipment-info.component.html',
  styleUrls: ['./entity-tooltip-v2-equipment-info.component.scss'],
})
export class EntityTooltipV2EquipmentInfoComponent<ENTITY extends ITOSItemEquipmentV2> implements OnChanges, OnDestroy {

  readonly faCube = faCube;
  readonly faImage = faImage;
  readonly faSearch = faSearch;

  readonly async: AsyncPipe;
  readonly EntityTooltipV2Size = EntityTooltipV2Size;
  readonly Preference3D = Preference3D;

  @Input()      config: EntityTooltipV2EquipmentInfo<ENTITY>;
  @Input()      entity: ENTITY;
  @Input()      size: EntityTooltipV2Size;


  headerBackground: Observable<string>;
  headerIcon: Observable<string>;
  headerModel: Observable<string>;

  infoJob: Observable<ITOSItemEquipmentV2$UseJob[]>;
  infoLevel: number;
  infoType: string;
  infoWeight: number;

  propsBasic: Observable<ITOSItemEquipmentV2$BasicTooltipProp[]>;
  propsBasicReinforced: Observable<number>;
  propsBasicTranscended: Observable<ITOSItemEquipmentV2$BasicTooltipProp$Transcended[]>;
  propsTooltip: Observable<ITOSItemEquipmentV2$Prop$Tooltip[]>;
  propsUnidentified: boolean;

  private subscription3D: Subscription;
  private subscriptionReinforced: Subscription;
  private subscriptionTranscended: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private http: HttpClient,
    private preference: PreferenceService,
  ) {
    this.async = new AsyncPipe(changeDetector);
    this.subscription3D = this.preference.get3D$().subscribe(value => this.onChangeHeader())
  }

  get height() { return this.size == EntityTooltipV2Size.SMALL ? 96 : 272 }
  get width() { return this.size == EntityTooltipV2Size.SMALL ? 96 : 417 }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entity || changes.size) {
      this.onChangeHeader();
      this.onChangeInfo();
      this.onChangeProps();

      this.subscriptionReinforced && this.subscriptionReinforced.unsubscribe();
      this.subscriptionReinforced = this.entity.Reinforce_2$.subscribe(value => this.onChangeReinforced());

      this.subscriptionTranscended && this.subscriptionTranscended.unsubscribe();
      this.subscriptionTranscended = this.entity.Transcend$.subscribe(value => this.onChangeTranscendence());
    }
  }

  ngOnDestroy(): void {
    this.subscription3D && this.subscription3D.unsubscribe();
    this.subscriptionReinforced && this.subscriptionReinforced.unsubscribe();
    this.subscriptionTranscended && this.subscriptionTranscended.unsubscribe();
  }

  onChangeHeader() {
    if (this.entity == null)
      return;

    this.headerBackground = this.size == EntityTooltipV2Size.SMALL ? this.entity.ItemGrade$BackgroundSmall : this.entity.ItemGrade$Background;
    this.headerIcon = this.entity.Icon$Tooltip;
    this.headerModel = this.preference.get3D() == Preference3D.YES && this.entity.$Model(this.http);
  }
  onChangeInfo() {
    if (this.entity == null)
      return;

    this.infoJob = this.entity.UseJob$Tooltip;
    this.infoLevel = this.entity.UseLv;
    this.infoType = this.entity.ReqToolTip;
    this.infoWeight = this.entity.Weight;
  }
  onChangeProps() {
    if (this.entity == null)
      return;

    this.propsTooltip = this.entity.$Props$Tooltip;
    this.propsUnidentified = this.entity.NeedAppraisal == 1 || this.entity.NeedRandomOption == 1;
  }
  onChangeReinforced() {
    if (this.entity == null)
      return;

    this.propsBasic = this.entity.BasicTooltipProp$List;
    this.propsBasicReinforced = this.entity.$BasicTooltipProp$Reinforced();
    this.changeDetector.markForCheck();
  }
  onChangeTranscendence() {
    if (this.entity == null)
      return;

    this.propsBasic = this.entity.BasicTooltipProp$List;
    this.propsBasicTranscended = this.entity.$BasicTooltipProp$Transcended();
    this.changeDetector.markForCheck();

    // TODO: need to get rid of the async pipe.. it's making everything sluggish
    // TODO: need to add the debounce to the transcend and reinforce observables
  }

  onToggle3D(value: Preference3D) {
    this.preference.set3D(value);
  }

}

export class EntityTooltipV2EquipmentInfo<ENTITY extends ITOSItemEquipmentV2> extends EntityTooltipV2<ENTITY> {}
