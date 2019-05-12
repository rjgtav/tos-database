import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import {EntityDetailComponent} from "../../entity-detail/entity-detail.component";
import {faFilter, faSearchMinus, faSearchPlus, faStar, faTimes} from '@fortawesome/free-solid-svg-icons';
import {TOSMapLinkNPC} from "../../../shared/domain/tos/map/tos-map.model";
import {TOSMonsterType} from "../../../shared/domain/tos/tos-domain";
import {ActivatedRoute, Router} from "@angular/router";

const MAP_SCALE_MIN = 0.85;
const MAP_SCALE_MAX = 3;
const MAP_SCALE_SPEED = 0.25;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-detail-map',
  templateUrl: './entity-detail-map.component.html',
  styleUrls: ['./entity-detail-map.component.scss']
})
export class EntityDetailMapComponent extends EntityDetailComponent implements OnInit {

  readonly faFilter = faFilter;
  readonly faStar = faStar;
  readonly faTimes = faTimes;
  readonly faSearchPlus = faSearchPlus;
  readonly faSearchMinus = faSearchMinus;

  filter: boolean = false;

  @ViewChild('mapElement')    mapElement: ElementRef;
                              mapHeight: number = 0;
                              mapWidth: number = 0;
                              mapScale: number = MAP_SCALE_MIN;
                              mapX: number = 0;
                              mapY: number = 0;

  private mouseX: number;
  private mouseY: number;

  spawns: TOSMapLinkNPC[];
  spawnsMonsters: TOSMapLinkNPC[];
  spawnsNPCs: TOSMapLinkNPC[];
  spawnsTreasures: TOSMapLinkNPC[];

  constructor(changeDetector: ChangeDetectorRef, route: ActivatedRoute, router: Router, private zone: NgZone) {
    super(changeDetector, route, router);

    this.onMapMouseMove = this.onMapMouseMove.bind(this);
    this.onMapMouseUp = this.onMapMouseUp.bind(this);
  }
  
  get mapStars() {
    let stars = this.map && this.map.Stars || 0;
    let starsList = [];

    for (let i = 0; i < stars; i ++)
      starsList.push(0);

    return starsList;
  };

  onInit() {
    super.onInit();

    this.spawns = null;
    this.spawnsMonsters = null;
    this.spawnsNPCs = null;
    this.spawnsTreasures = null;

    this.map.Link_NPCs && this.map.Link_NPCs.subscribe(value => {
      this.spawns = value.filter(value => value.Link && value.Icon);
      this.spawnsMonsters = this.spawns.filter(value => value.NPC && value.NPC.Type == TOSMonsterType.MONSTER);
      this.spawnsNPCs = this.spawns.filter(value => value.NPC && value.NPC.Type != TOSMonsterType.MONSTER);
      this.spawnsTreasures = this.spawns.filter(value => value.Item);

      this.changeDetector.markForCheck();
    });
  }

  onMapLoad(event: Event) {
    let map = event.target as HTMLImageElement;
    let mapContainer = this.mapElement.nativeElement.parentNode.getBoundingClientRect();

    this.mapElement.nativeElement.style.height = `${ this.mapHeight = map.height }px`;
    this.mapElement.nativeElement.style.width = `${ this.mapWidth = map.width }px`;

    this.mapX = -this.mapWidth * this.mapScale / 2 + mapContainer.width / 2;
    this.mapY = -this.mapHeight * this.mapScale / 2 + mapContainer.height / 2;

    this.update();
  }
  onMapMouseDown(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.zone.runOutsideAngular(() => {
      document.addEventListener('pointermove', this.onMapMouseMove);
      document.addEventListener('pointerup', this.onMapMouseUp);
    });

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
    this.zone.runOutsideAngular(() => {
      document.removeEventListener('pointermove', this.onMapMouseMove);
      document.removeEventListener('pointerup', this.onMapMouseUp);
    });
  }
  onMapMouseWheel(event: MouseWheelEvent) {
    this.onMapScale(event.deltaY > 0 ? -1 : 1, event);

    return false;
  }
  onMapScale(direction: number, event?: MouseWheelEvent) {
    let mapContainer = this.mapElement.nativeElement.parentNode.getBoundingClientRect();
    let mapScale = this.mapScale;

    // Calculate new scale
    this.mapScale += direction * MAP_SCALE_SPEED;
    this.mapScale = Math.max(MAP_SCALE_MIN, Math.min(MAP_SCALE_MAX, this.mapScale));

    if (this.mapScale == mapScale)
      return;

    // Calculate scale origin
    // https://stackoverflow.com/a/46833254
    let zoomPointX = (event ? event.pageX : mapContainer.left + mapContainer.width / 2) - (mapContainer.left + window.pageXOffset);
    let zoomPointY = (event ? event.pageY : mapContainer.top + mapContainer.height / 2) - (mapContainer.top + window.pageYOffset);

    // Update map position so it scales towards the mouse
    let zoomTargetX = (zoomPointX - this.mapX) / mapScale;
    let zoomTargetY = (zoomPointY - this.mapY) / mapScale;

    this.mapX = -zoomTargetX * this.mapScale + zoomPointX;
    this.mapY = -zoomTargetY * this.mapScale + zoomPointY;

    this.update();
  }

  private update() {
    let mapContainer = this.mapElement.nativeElement.parentNode.getBoundingClientRect();

    // Make sure the map stays inside the container
    if (this.mapX > 0)
      this.mapX = 0;
    if (this.mapX + this.mapWidth * this.mapScale < mapContainer.width)
      this.mapX = mapContainer.width - this.mapWidth * this.mapScale;
    if(this.mapY > 0)
      this.mapY = 0;
    if(this.mapY + this.mapHeight * this.mapScale < mapContainer.height)
      this.mapY = mapContainer.height - this.mapHeight * this.mapScale;

    window.requestAnimationFrame(() => {
      this.mapElement.nativeElement.style.transform = `translate(${ this.mapX }px, ${ this.mapY }px) scale(${ this.mapScale })`;
      this.mapElement.nativeElement.style.setProperty('--scale', this.mapScale)
    });
  }

}
