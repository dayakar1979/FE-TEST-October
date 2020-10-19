import { Component, OnInit } from '@angular/core';
import {RootObject, TranscationData} from '../interfaces/interfaces';
import {DataService} from './data.service';
import {orderBy} from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'fe-test';
  fromAccount: any = '';
  toAccount: any = '';
  amount: any = '';
  transaction: RootObject;
  transactionList: TranscationData[] = [];
  preview = false;
  transfer = false;
  validationMessage = '';
  searchText = '';
  dateAsc: any = null;
  amountAsc: any = null;
  merchantNameAsc: any = null;
  merchantSortImagePath: any = '';
  amountSortImagePath: any = '';
  dateSortImagePath: any = '';
  totalAmount: number = 5824.76;
  fromAccountNumber: any = 'From Checking(4692) - $';
  
  constructor(private _dataService:DataService) {}

  ngOnInit() {
    this.fromAccount = this.fromAccountNumber  + this.totalAmount;
    this._dataService.getData().subscribe (dataObj =>
    {
      this.transaction = dataObj;
      let data = [];
      data = dataObj.data;
      for (var i = 0; i < data.length-1; i++) {
        let merchantName: string = data[i].merchant.name;
        merchantName = merchantName.split(' ').join('-');
        merchantName = '../assets/icons/' + merchantName.toLocaleLowerCase() + '.png';
        let transcationData = {
          date: new Date(data[i].dates.valueDate),
          amount: Number(data[i].transaction.amountCurrency.amount),
          type: data[i].transaction.type,
          merchantName: data[i].merchant.name,
          imagePath: merchantName,
          border:  "8px solid "+ data[i].categoryCode
        };
        this.transactionList.push(transcationData);
      }
    });
  }

  submitClick() {
    if(this.toAccount == '' || this.toAccount == undefined) {
      this.preview = false;
      this.validationMessage = 'Please input to Account.';
      return;
    }
    if(this.amount == '' || this.amount == undefined) {
      this.preview = false;
      this.validationMessage = 'Please input amount to transfer.';
      return;
    }
    if (this.totalAmount - Number(this.amount) < -500) {
      this.preview = false;
      this.validationMessage = 'You cannot overdraft beyond a balance of $ -500.00.';
    } else {
      this.preview = true;
    }
  }

  transferClick() {
    this.transfer = true;
    this.preview = false;
    let transcationData = {
      date: new Date(),
      amount: Number(this.amount),
      merchantName: this.toAccount,
      type: 'Transaction',
      imagePath: '../assets/icons/whole-foods.png',
      border: '8px solid #12a580'
    };
    this.transactionList.push(transcationData);
    let remainingBalance = (this.totalAmount - Number(this.amount)).toFixed(2);
    this.totalAmount = Number(remainingBalance);
    this.fromAccount = this.fromAccountNumber + remainingBalance;
    this.toAccount = '';
    this.amount = '';
    this.validationMessage = 'Money Transfered Successfully!.';
  }

  getClass() {
    if (this.validationMessage == ''){
      return '';
    } else if(this.validationMessage.indexOf('Successfully') >= 0) {
      return 'successClass';
    } else {
      return 'failureClass';
    }
  }

  sortingList(sortByColumn: any) {
    let columns = [];
    let orderList = [];
    let upArrow = '../assets/uparrow.png';
    let downArrow = '../assets/downarrow.png';

    if(sortByColumn == 'merchantName') {
      columns.push('merchantName');
      if(this.merchantNameAsc != null) {
        if(this.merchantNameAsc) {
          this.merchantNameAsc = false;
          orderList.push('desc');
          this.merchantSortImagePath = upArrow;
        } else {
          this.merchantNameAsc = true;
          orderList.push('asc');
          this.merchantSortImagePath = downArrow;
        }
      } else {
          this.merchantNameAsc = true;
          orderList.push('asc');
          this.merchantSortImagePath = downArrow;
      }
    } else {
      if(this.merchantNameAsc != null) { 
        columns.push('merchantName');
        this.merchantNameAsc ? orderList.push('asc') : orderList.push('desc');
      }
    }
    
    if(sortByColumn == 'amount') {
      columns.push('amount');
      if(this.amountAsc != null) {
        if(this.amountAsc) {
          this.amountAsc = false;
          orderList.push('desc');
          this.amountSortImagePath = upArrow;
        } else {
          this.amountAsc = true;
          orderList.push('asc');
          this.amountSortImagePath = downArrow;
        }
      } else {
          this.amountAsc = true;
          orderList.push('asc');
          this.amountSortImagePath = downArrow;
      }
    } else {
      if(this.amountAsc != null) { 
        columns.push('amount');
        this.amountAsc ? orderList.push('asc') : orderList.push('desc');
      }
    }

    if(sortByColumn == 'date') {
      columns.push('amount');
      if(this.dateAsc != null) {
        if(this.dateAsc) {
          this.dateAsc = false;
          orderList.push('desc');
          this.dateSortImagePath = upArrow;
        } else {
          this.dateAsc = true;
          orderList.push('asc');
          this.dateSortImagePath = downArrow;
        }
      } else {
          this.dateAsc = true;
          orderList.push('asc');
          this.dateSortImagePath = downArrow;
      }
    } else {
      if(this.dateAsc != null) { 
        columns.push('date');
        this.dateAsc ? orderList.push('asc') : orderList.push('desc');
      }
    }
    this.transactionList = orderBy(this.transactionList, columns, orderList);
  }
}