import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ITOSEntity} from "../../shared/domain/tos/tos-domain";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
})
export abstract class EntityDetailV2Component<T extends ITOSEntity> implements OnDestroy {

  public entity: T;
  private readonly subscriptionRoute: Subscription;

  protected constructor(private route: ActivatedRoute) {
    this.subscriptionRoute = this.route.data.subscribe(({ response }) => this.entity = response as T);
  }

  ngOnDestroy(): void {
    this.subscriptionRoute && this.subscriptionRoute.unsubscribe();
  }

}
