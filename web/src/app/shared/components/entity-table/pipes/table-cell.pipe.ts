import {ChangeDetectorRef, Injector, Pipe, PipeTransform} from '@angular/core';
import {EntityTableColumn, EntityTablePipeDefinition} from "../entity-table.component";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {ITOSEntity} from "../../../domain/tos/tos-domain";

@Pipe({
  name: 'tosTableCell'
})
export class TableCellPipe implements PipeTransform {

  constructor(private injector: Injector) {}

  // Thanks to https://stackoverflow.com/a/46910713
  transform(row: ITOSEntity, column: EntityTableColumn, changeDetector: ChangeDetectorRef): string {
    return this.injector
      .get(column.pipe.pipeClass)
      .transform(row, column.pipe, changeDetector);
  }

}

export abstract class TableCellPipeBase<DEFINITION extends EntityTablePipeDefinition> implements PipeTransform {

  protected constructor(protected sanitizer: DomSanitizer) {}

  abstract transform(row: ITOSEntity, definition: DEFINITION, changeDetector: ChangeDetectorRef): Observable<SafeHtml>;
}
