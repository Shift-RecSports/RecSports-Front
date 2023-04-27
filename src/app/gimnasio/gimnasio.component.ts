import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Registro {
  matricula: string;
  nombre: string;
  entrada: string;
  salida: string;
}

const REGISTRO_DATA: Registro[] = [
  {
    matricula: 'A01284184',
    nombre: 'Daniel Loredo',
    entrada: '11:54',
    salida: '',
  },
  {
    matricula: 'A02833945',
    nombre: 'Martín Barrientos',
    entrada: '11:50',
    salida: '',
  },
  {
    matricula: 'A02212445',
    nombre: 'Sasha Morozov',
    entrada: '11:44',
    salida: '',
  },
  {
    matricula: 'A02212445',
    nombre: 'David Celis',
    entrada: '11:41',
    salida: '',
  },
  {
    matricula: 'A02212445',
    nombre: 'Pedro Gonzales',
    entrada: '11:40',
    salida: '',
  },
  {
    matricula: 'A01284184',
    nombre: 'Juan Hernandez',
    entrada: '11:31',
    salida: '',
  },
  {
    matricula: 'A01284184',
    nombre: 'Roberto Pizzali',
    entrada: '11:20',
    salida: '12:59',
  },
  {
    matricula: 'A01284184',
    nombre: 'Troy Urbie',
    entrada: '11:22',
    salida: '10:50',
  },
  {
    matricula: 'A01284184',
    nombre: 'Dante Diaz',
    entrada: '07:20',
    salida: '09:10',
  },
  {
    matricula: 'A01284184',
    nombre: 'Daniel Loredo',
    entrada: '07:20',
    salida: '09:10',
  },
  {
    matricula: 'A01284184',
    nombre: 'Daniel Loredo',
    entrada: '07:20',
    salida: '09:10',
  },
  {
    matricula: 'A01284184',
    nombre: 'Daniel Loredo',
    entrada: '07:20',
    salida: '09:10',
  },
  {
    matricula: 'A01284184',
    nombre: 'Daniel Loredo',
    entrada: '07:20',
    salida: '09:10',
  },
  {
    matricula: 'A01284184',
    nombre: 'Daniel Loredo',
    entrada: '07:20',
    salida: '09:10',
  },
  {
    matricula: 'A01284184',
    nombre: 'Daniel Loredo',
    entrada: '07:20',
    salida: '09:10',
  },
  {
    matricula: 'A01284184',
    nombre: 'Daniel Loredo',
    entrada: '07:20',
    salida: '09:10',
  },
  {
    matricula: 'A01284184',
    nombre: 'Daniel Loredo',
    entrada: '07:20',
    salida: '09:10',
  },
  {
    matricula: 'A01284184',
    nombre: 'Daniel Loredo',
    entrada: '07:20',
    salida: '09:10',
  },
  {
    matricula: 'A01284184',
    nombre: 'Daniel Loredo',
    entrada: '07:20',
    salida: '09:10',
  },
  {
    matricula: 'A01284184',
    nombre: 'Daniel Loredo',
    entrada: '07:20',
    salida: '09:10',
  },
];

@Component({
  selector: 'app-gimnasio',
  templateUrl: './gimnasio.component.html',
  styleUrls: ['./gimnasio.component.css'],
})
export class GimnasioComponent {
  displayedColumns: string[] = ['matricula', 'nombre', 'entrada', 'salida'];
  dataSource = new MatTableDataSource<Registro>(REGISTRO_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  minDate: Date;
  maxDate: Date;
  date = new FormControl(new Date());

  constructor() {
    // Set the minimum to January 1st and maximun to June 31st
    // const currentYear = new Date().getFullYear();

    // TODO: Change maxDate to current day
    this.minDate = new Date(2023, 0, 1);
    this.maxDate = new Date(2023, 5, 31);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
