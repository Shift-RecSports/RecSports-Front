import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

const EXCEL_EXTENSION = '.xlsx';
// const myHeader = ['Fecha', 'Id', 'Matricula', 'Nombre', 'Entrada', 'Salida'];
var wscols = [
  { wch: 15 },
  { wch: 5 },
  { wch: 15 },
  { wch: 30 },
  { wch: 10 },
  { wch: 10 },
];

var fwscols = [{ wch: 20 }, { wch: 15 }];

@Injectable({ providedIn: 'root' })
export class ExcelServiceService {
  constructor() {}

  public exportToExcel(element: any, freq: any, fileName: string): void {
    // generate workbook and add the worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);
    ws['!cols'] = wscols;

    const frequencyWS: XLSX.WorkSheet = XLSX.utils.json_to_sheet(freq);
    ws['!cols'] = fwscols;

    const workbook: XLSX.WorkBook = XLSX.utils.book_new(); // save to file

    XLSX.utils.book_append_sheet(workbook, ws, 'Registros');
    XLSX.utils.book_append_sheet(workbook, frequencyWS, 'Dia');
    XLSX.writeFile(workbook, `${fileName}${EXCEL_EXTENSION}`);
  }
}
