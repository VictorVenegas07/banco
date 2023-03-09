import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  actividad = new FormControl();
  retiro: boolean = false;
  colum = [100000, 50000, 20000, 10000];
  val = 0;
  contar = 0;
  sum = 0;
  num = '';
  rows: any[] = [];
  quantities = [0, 0, 0, 0];
  money: any[] = [
    {
      id: 100000,
      src: './../../../assets/Billetes/colombian-peso-vector-100K.png',
      count: 0
    },
    {
      id: 50000,
      src: './../../../assets/Billetes/colombian-peso-vector-50kwebp.png',
      count: 0
    },
    {
      id: 20000,
      src: './../../../assets/Billetes/colombian-peso-vector-20K.png',
      count: 0,
    },
    {
      id: 10000,
      src: './../../../assets/Billetes/colombian-peso-vector-10K.png',
      count: 0,
    }
  ]
  teclado = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [0, '']
  ]
  onRetirar($event: any) {
    if (this.val % 100 == 0) {
      this.retiro = !this.retiro;
      let arrayN = [...this.colum];
      this.getsBinary(this.getsBinary, 0, arrayN.reverse())
      this.countMoney(this.getMoney)
        .then(elemet => {
          let newMoney = this.money.reverse();
          elemet?.map((elemet, index) => {
            newMoney[index].count = elemet;
          })
          console.log(this.money = [...newMoney])
        })
        .catch(err => console.log(err));
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Valor incorrecto',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  }
  getsBinary = (callback: any, start = 0, colums: any) => {
    let count = 0, rowsc = [0, 0, 0, 0];
    for (let index = start; index < colums.length; index++) {
      const element = colums[index];
      if (this.contar + element <= this.val) {
        this.contar += element;
        rowsc[index] = 1
      }
    }
    if (start <= 3) {
      count = start + 1;
      let reverse = rowsc;
      this.rows.push(reverse);
      if (this.contar == this.val)
        return;
      else
        callback(this.getsBinary, count, colums)

    } else {
      callback(this.getsBinary, 0, colums)

    }
  }

  getMoney = (value: any) => {
    value?.forEach((element: number, index: number) => {
      if (element === 1)
        this.quantities[index] += 1;
    });
  }


  countMoney = async (callback: any) => {
    for (let index = 0; index < this.rows.length; index++) {
      const element = this.rows[index];
      callback(element);
    }
    return this.quantities;
  }


  constructor() { }

  ngOnInit(): void {
    this.actividad.disable()

  }


  saverNum(item: any) {
    // this.num = `${this.num} ${item}`
    this.num = this.num + '' + item
    this.val = Number(this.num) || 0;
    this.actividad.setValue(this.val)
    // let value = new Number(this.num);
    console.log(this.actividad)
  }
  clear() {
    this.rows = []
    this.colum = [100000, 50000, 20000, 10000];
    this.quantities = [0, 0, 0, 0];
    this.money = [
      {
        id: 100000,
        src: './../../../assets/Billetes/colombian-peso-vector-100K.png',
        count: 0
      },
      {
        id: 50000,
        src: './../../../assets/Billetes/colombian-peso-vector-50kwebp.png',
        count: 0
      },
      {
        id: 20000,
        src: './../../../assets/Billetes/colombian-peso-vector-20K.png',
        count: 0,
      },
      {
        id: 10000,
        src: './../../../assets/Billetes/colombian-peso-vector-10K.png',
        count: 0,
      }
    ]
    this.retiro = false;
    this.contar = 0;
    this.num = '';
    this.sum = 0;
    this.val = 0;
    this.actividad.setValue('')
    console.log('valor', this.val, 'conteo', this.contar, 'numero', this.num, 'filas', this.rows, 'cantidades', this.quantities, 'colum', this.colum)

  }
}
