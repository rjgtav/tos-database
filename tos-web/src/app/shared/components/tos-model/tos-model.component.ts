import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {TOSUrlService} from "../../service/tos-url.service";
import * as THREE from 'three';
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-model',
  templateUrl: './tos-model.component.html',
  styleUrls: ['./tos-model.component.scss']
})
export class TOSModelComponent implements OnChanges, OnDestroy, OnInit {

  @Input()                                  id: string;
  @Input()                                  height: number;
  @Input()                                  width: number;

  @ViewChild('canvas', { static: true })    canvas: ElementRef;

  private $camera: THREE.PerspectiveCamera;
  private $controls: OrbitControls;
  private $renderer: THREE.Renderer;
  private $scene: THREE.Scene;

  private subscription: Subscription;

  constructor(
    private http: HttpClient,
    private zone: NgZone,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.height || changes.width) {
      this.$camera && (this.$camera.aspect = this.width / this.height);
      this.$renderer && (this.$renderer.setSize(this.width, this.height));
    }

    if (changes.id) {
      this.unload();
      this.subscription && this.subscription.unsubscribe();
      this.subscription = this.id && this.http
        .get<Xac>(TOSUrlService.ApiData(this.id, 'xac'))
        .subscribe(value => this.load(value));
    }
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
    this.unload();
  }

  ngOnInit(): void {
    this.$scene = new THREE.Scene();
    this.$camera = new THREE.PerspectiveCamera(60, this.width / this.height);
    this.$renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: this.canvas.nativeElement });
    this.$renderer.setSize(this.width, this.height);

    this.$controls = new OrbitControls(this.$camera, this.$renderer.domElement);
    this.$controls.autoRotate = true;
    this.$controls.autoRotateSpeed = 3;
    this.$controls.enablePan = false;
    this.$controls.enableZoom = true;
    this.$controls.zoomSpeed = 1.5;
  }

  async load(xac: Xac) {
    // Load OBJ and apply textures
    let obj = await this.http.get(TOSUrlService.AssetRegion(`3d/${ xac.Mesh.replace(/\\/g, '/').replace('.xac', '.obj') }`), { responseType: 'text' }).toPromise();
    let model = new OBJLoader().parse(obj);
    let materials = [];

    for (let line of obj.split('\n')) {
      if (!line.startsWith('#'))
        continue;

      let parts = line.slice(2).split(' ');
      let cmd = parts[0];

      switch (cmd) {
        case 'material':
          let url = parts[1];
          let texture: THREE.Texture;

          try {
            if (url != 'None') {
              texture = await new Promise((resolve, reject) => new THREE.TextureLoader().load(TOSUrlService.AssetRegion(`3d/${xac.Path}${url}`), value => resolve(value), undefined, value => reject(value)));
              texture.flipY = false;
            }
          } catch (e) {}

          materials.push(texture
            ? new THREE.MeshBasicMaterial({ map: texture, alphaTest: 0.7, side: THREE.DoubleSide })
            : new THREE.MeshPhongMaterial()
          );
          break;
        case 'mesh':
          (model.children[+parts[1]] as THREE.Mesh).material = materials[+parts[2]];
          break;
      }
    }

    // Calculate bounding box and center object in the scene origin (0, 0, 0)
    let bounds = new THREE.Box3().setFromObject(model);
    let center = new THREE.Vector3(
      (Math.abs(bounds.min.x) + bounds.max.x) / 2,
      (Math.abs(bounds.min.y) + bounds.max.y) / 2,
      (Math.abs(bounds.min.z) + bounds.max.z) / 2
    );

    // Note: as the model is not always centered, we first need to move it to (0, 0, 0) and only after move it to the center
    model.position.x = -bounds.min.x - center.x;
    model.position.y = -bounds.min.y - center.y;
    model.position.z = -bounds.min.z - center.z;

    // Reposition camera and make sure it doesn't go too close nor too far
    let distanceMin = Math.max(center.x, center.y, center.z);
    let distance = distanceMin + 35;
    let distanceMax = distance + 35;

    this.$camera.position.x = 0;
    this.$camera.position.y = 0;
    this.$camera.position.z = distance;

    this.$controls.maxDistance = distanceMax;
    this.$controls.minDistance = distanceMin;

    // Add model to scene and start rendering
    this.$scene.add(model);
    this.render();
  }

  render() {
    if (this.$scene.children.length == 0)
      return;

    this.$controls.update();
    this.$renderer.render(this.$scene, this.$camera);
    this.zone.runOutsideAngular(() => requestAnimationFrame(() => this.render()));
  }

  unload() {
    this.$scene && this.$scene.remove.apply(this.$scene, this.$scene.children);
  }

}

interface Xac {
  ClassID: number,
  ClassName: string,
  Mesh: string,
  Path: string,
}
