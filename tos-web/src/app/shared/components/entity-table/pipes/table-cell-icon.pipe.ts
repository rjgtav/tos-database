import {Pipe} from '@angular/core';
import {EntityTablePipeDefinition} from "../entity-table.component";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Observable, of} from "rxjs";
import {TableCellPipeBase} from "./table-cell.pipe";
import {ITOSEntity} from "../../../domain/tos/tos-domain";

@Pipe({
  name: 'tableCellIcon'
})
export class TableCellIconPipe extends TableCellPipeBase<TableCellIconPipeDefinition> {

  constructor(sanitizer: DomSanitizer) { super(sanitizer) }

  transform(row: ITOSEntity, definition: TableCellIconPipeDefinition): Observable<SafeHtml> {
    let entity = definition.transformEntity ? definition.transformEntity(row) : row;
    let src = definition.transformValue ? definition.transformValue(entity[definition.column]) : entity[definition.column];
    let title = entity[definition.column];
        title = title.indexOf('http') == 0 ? '' : title;

    return of(this.sanitizer.bypassSecurityTrustHtml(
      `<img height="40" width="40" src="${ src }" title="${ title }" />`));
  }

}

export class TableCellIconPipeDefinition extends EntityTablePipeDefinition {
  constructor(
    public column: string,
    public transformEntity?: (value: any) => ITOSEntity,
    public transformValue?: (value: any) => string,
  ) { super(column, TableCellIconPipe); }
}
