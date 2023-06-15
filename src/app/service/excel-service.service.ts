import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

const EXCEL_EXTENSION = '.xlsx'; // Extension del archivo a descargar
var wscols = [{ wch: 11 }, { wch: 11 }, { wch: 40 }, { wch: 10 }, { wch: 10 }]; // Tamano de las columnas
var fwscols = [{ wch: 20 }, { wch: 15 }]; // Tamano de las columnas

// Servicio para descarga de registros a Excel
@Injectable({ providedIn: 'root' })
export class ExcelServiceService {
  constructor() {}

  // Exporta los registros a un archivo de Excel
  public exportToExcel(element: any, freq: any, fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);
    ws['!cols'] = wscols;

    const frequencyWS: XLSX.WorkSheet = XLSX.utils.json_to_sheet(freq);
    frequencyWS['!cols'] = fwscols;

    const workbook: XLSX.WorkBook = XLSX.utils.book_new(); // save to file

    XLSX.utils.book_append_sheet(workbook, ws, 'Registros');
    XLSX.utils.book_append_sheet(workbook, frequencyWS, 'Dia');
    XLSX.writeFile(workbook, `${fileName}${EXCEL_EXTENSION}`);
  }
}
