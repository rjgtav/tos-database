import {Pipe} from '@angular/core';
import {EntityTablePipeDefinition} from "../entity-table.component";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {TableCellPipeBase} from "./table-cell.pipe";
import {Observable, of} from "rxjs";
import {ITOSEntity} from "../../../domain/tos/tos-domain";
import {PercentPipe} from "@angular/common";
import {TimePipe} from "../../../directives/time.pipe";

@Pipe({
  name: 'tableCellText'
})
export class TableCellTextPipe extends TableCellPipeBase<TableCellTextPipeDefinition> {

  constructor(private percent: PercentPipe, sanitizer: DomSanitizer, private time: TimePipe) { super(sanitizer) }

  transform(entity: ITOSEntity, definition: TableCellTextPipeDefinition): Observable<SafeHtml> {
    let html = '';

    if (definition.format != null) {
      switch (definition.format) {
        case TableCellTextPipeFormat.MULTILINE:
          html = `<span class="text-multiline">${ entity[definition.column] }</span>`;
          break;
        case TableCellTextPipeFormat.PERCENTAGE:
          html = `<span>${ this.percent.transform(entity[definition.column] / 100, '1.1-2') }</span>`;
          break;
        case TableCellTextPipeFormat.QUANTITY:
          html = `<span>&times; ${ entity[definition.column] }</span>`;
          break;
        case TableCellTextPipeFormat.QUANTITY_RANGE:
          let quantityMin = entity[definition.column.split('.')[0]];
          let quantityMax = entity[definition.column.split('.')[1]];

          if (quantityMin > 0 || quantityMax > 0)
            if (quantityMax != quantityMin)
              html = `<span>&times; ${ quantityMin }~${ quantityMax }</span>`;
            else
              html = `<span>&times; ${ quantityMin }</span>`;
          break;
        case TableCellTextPipeFormat.TIME:
          html = `<span>${ this.time.transform(entity[definition.column]) }</span>`;
          break;
      }
    }  else {
      html = `<span>${ entity[definition.column] }</span>`;
    }

    return of(this.sanitizer.bypassSecurityTrustHtml(html));
  }

}

export class TableCellTextPipeDefinition extends EntityTablePipeDefinition {
  constructor(
    public column: string,
    public format?: TableCellTextPipeFormat,
  ) { super(column, TableCellTextPipe); }
}

export enum TableCellTextPipeFormat {
  MULTILINE,
  PERCENTAGE,
  QUANTITY,
  QUANTITY_RANGE,
  TIME,
}
