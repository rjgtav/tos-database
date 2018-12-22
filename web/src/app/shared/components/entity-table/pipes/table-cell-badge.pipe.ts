import {Pipe} from '@angular/core';
import {EntityTablePipeDefinition} from "../entity-table.component";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Observable, of} from "rxjs";
import {TableCellPipeBase} from "./table-cell.pipe";
import {ITOSEntity} from "../../../domain/tos/tos-domain";

@Pipe({
  name: 'tableCellBadge'
})
export class TableCellBadgePipe extends TableCellPipeBase<TableCellBadgePipeDefinition> {

  constructor(sanitizer: DomSanitizer) { super(sanitizer) }

  transform(row: ITOSEntity, definition: TableCellBadgePipeDefinition): Observable<SafeHtml> {
    return of(this.sanitizer.bypassSecurityTrustHtml(`
        <span>
            <span class="d-inline-block align-text-bottom mr-sm-1 rounded-circle"
                  style="background: ${ definition.transformColor(row[definition.column]) };
                         height: 1rem; width: 1rem;"></span>
            <span class="d-none d-sm-table-cell">${ row[definition.column] }</span>
        </span>
    `));
  }

}

export class TableCellBadgePipeDefinition extends EntityTablePipeDefinition {
  constructor(
    public column: string,
    public transformColor: (value: any) => string,
  ) { super(column, TableCellBadgePipe); }
}
