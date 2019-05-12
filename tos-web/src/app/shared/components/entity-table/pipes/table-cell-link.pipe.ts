import {ChangeDetectorRef, Pipe} from '@angular/core';
import {EntityTableComponent, EntityTablePipeDefinition} from "../entity-table.component";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {TableCellPipeBase} from "./table-cell.pipe";
import {ITOSEntity} from "../../../domain/tos/tos-domain";

@Pipe({
  name: 'tableCellLink'
})
export class TableCellLinkPipe extends TableCellPipeBase<TableCellLinkPipeDefinition> {

  constructor(sanitizer: DomSanitizer) { super(sanitizer) }

  transform(row: ITOSEntity, definition: TableCellLinkPipeDefinition, changeDetector: ChangeDetectorRef): Observable<SafeHtml> {
    let observable = (row[definition.column] as Observable<ITOSEntity | ITOSEntity[]>);

    return observable && observable.pipe(map(value => {
        let html: string = '';
        let array = Array.isArray(value) ? value : [value];

        for (let i = 0; i < array.length; i ++) {
          let entity = array[i];
          let value = definition.transformValue ? definition.transformValue(array[i]) : null;

          html +=
           `<a href="${ entity.Url }" class="d-block position-relative mr-1" style="height: 40px; width: 40px">
                <img height="40" width="40" class="position-absolute" style="top: 0; left: 0"
                     ${ EntityTableComponent.ATTRIBUTE_DATA_COLUMN }="${ definition.column }"
                     ${ EntityTableComponent.ATTRIBUTE_DATA_I}="${ i }"
                     ${ EntityTableComponent.ATTRIBUTE_DATA_ROUTER }="${ entity.Url }"
                     src="${ entity.Icon }" />
          ` + (value != null ? `
                <span class="position-absolute text-outline text-white"
                      style="bottom: 0; right: 0.25rem; pointer-events: none">${ value }</span>
          ` : '') + `
            </a>`
        }

        changeDetector.detectChanges();

        return this.sanitizer.bypassSecurityTrustHtml('<span class="d-flex">' + html + '</span>');
    }));
  }

}

export class TableCellLinkPipeDefinition extends EntityTablePipeDefinition {
  constructor(
    public column: string,
    public transformValue?: (value: any) => number,
  ) { super(column, TableCellLinkPipe); }
}
