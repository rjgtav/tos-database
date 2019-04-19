import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {EntityDetailV2Component} from "../entity-detail-v2.component";
import {ActivatedRoute} from "@angular/router";
import {ITOSMap, TOSNPCType} from "../../../shared/domain/tos/tos-domain";
import {TableCellTextPipeDefinition,} from "../../../shared/components/entity-table/pipes/table-cell-text.pipe";
import {TOSMapSpawn} from "../../../shared/domain/tos/map/tos-map.model";
import {TableCellIconPipeDefinition} from "../../../shared/components/entity-table/pipes/table-cell-icon.pipe";
import {faFilter, faSearchMinus, faSearchPlus} from "@fortawesome/free-solid-svg-icons";

const MAP_SCALE_MIN = 0.5;
const MAP_SCALE_MAX = 2;
const MAP_SCALE_SPEED = 0.25;

@Component({
  selector: 'tos-entity-detail-map',
  templateUrl: './entity-detail-map.component.html',
  styleUrls: ['./entity-detail-map.component.scss']
})
export class EntityDetailMapComponent extends EntityDetailV2Component<ITOSMap> implements OnInit {

  readonly COLUMNS_NPCS = [
    { label: '',              pipe: new TableCellIconPipeDefinition('Icon', (o: TOSMapSpawn) => o.NPC), class: 'p-1 text-center' },
    { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID', null, (o: TOSMapSpawn) => o.NPC), hideMobile: true },
    { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name', null, (o: TOSMapSpawn) => o.NPC), wide: true },
  ];

  readonly faFilter = faFilter;
  readonly faSearchPlus = faSearchPlus;
  readonly faSearchMinus = faSearchMinus;

  @ViewChild('map')   map: ElementRef;
                      mapScale: number = MAP_SCALE_MIN;
                      mapX: number = 0;
                      mapY: number = 0;

  private mouseX: number;
  private mouseY: number;

  minimapIcons: TOSMapSpawn[];

  constructor(route: ActivatedRoute, private zone: NgZone) {
    super(route);

    this.onMapMouseMove = this.onMapMouseMove.bind(this);
    // TODO: show arrows, warp statues, treasures and NPCs by default (and class masters)
    // TODO: implement toggle for monsters
  }

  async ngOnInit() {
    this.update();
    this.entity.Link_NPCs.subscribe(value => this.minimapIcons = value.filter(value => value.NPC.Type != TOSNPCType.MONSTER && !!value.NPC.Icon));
  }

  onMapMouseDown(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.zone.runOutsideAngular(() => document.addEventListener('pointermove', this.onMapMouseMove));

    return false;
  }
  onMapMouseMove(event: MouseEvent) {
    this.mapX += (event.clientX - this.mouseX);
    this.mapY += (event.clientY - this.mouseY);

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.update();

    return false;
  }
  onMapMouseUp(event: MouseEvent) {
    this.zone.runOutsideAngular(() => document.removeEventListener('pointermove', this.onMapMouseMove));
  }
  onMapMouseWheel(event: MouseWheelEvent) {
    this.onMapScale(event.deltaY > 0 ? -1 : 1);

    return false;
  }
  onMapScale(direction: 1 | -1) {
    this.mapScale += direction * MAP_SCALE_SPEED;
    this.mapScale = Math.max(MAP_SCALE_MIN, Math.min(MAP_SCALE_MAX, this.mapScale));
    this.update();
  }

  private update() {
    this.map.nativeElement.style.transform = `translate(${this.mapX}px, ${this.mapY}px) scale(${ this.mapScale})`;
  }

}
