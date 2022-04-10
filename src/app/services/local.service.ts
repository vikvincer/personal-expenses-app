import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ExpensesModel } from '../models/expenses.model';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DateTime } from 'luxon';


@Injectable({
  providedIn: 'root'
})
export class LocalService {

  activeUser = 'user';
  localData = [];
  localDataStore$ = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {
    this.updateLocalStore();
   }
  
  private updateLocalStore() {
    const localStringData: any = this.getLocalStorageData();
    const paredData: any = JSON.parse(localStringData);
    this.localDataStore$.next(paredData);
  }

  private generateUniqueId() {
    return {id: uuidv4()}
  }

  protected getLocalStorageData() {
    return localStorage.getItem(this.activeUser);
  }

  saveExpenses(newEntry: ExpensesModel) {
    const oldData: any = this.getLocalStorageData();
    const parsedOldData = JSON.parse(oldData);
    let dataArray: any = !parsedOldData ? [] : parsedOldData;
    var setToStartOfDay = new Date(newEntry.date);
    setToStartOfDay.setHours(0,0,0,0);
    newEntry.date = setToStartOfDay;
    if (!dataArray.length) {
      dataArray.push({...newEntry, ...this.generateUniqueId()})
    } else {
      dataArray = parsedOldData
      dataArray.push({...newEntry, ...this.generateUniqueId()});
    }
    localStorage.setItem(this.activeUser, JSON.stringify(dataArray));
    this.updateLocalStore();
  }

  updateExpenses(id: string, formData: ExpensesModel) {
    const localData: any = this.getLocalStorageData();
    const parsedLocalDataArr = JSON.parse(localData);
    const expensesItemIndex = parsedLocalDataArr.findIndex((data: any) => data.id === id);
    parsedLocalDataArr[expensesItemIndex] = {...parsedLocalDataArr[expensesItemIndex], ...formData};
    localStorage.setItem(this.activeUser, JSON.stringify(parsedLocalDataArr));
    this.updateLocalStore();
  }

  deleteExpenses(id: string) {
    const localData: any = this.getLocalStorageData();
    const parsedLocalDataArr = JSON.parse(localData);
    const expensesItemIndex = parsedLocalDataArr.findIndex((data: any) => data.id === id);
    parsedLocalDataArr.splice(expensesItemIndex, 1);
    localStorage.setItem(this.activeUser, JSON.stringify(parsedLocalDataArr));
     this.updateLocalStore();

  }

  getExpenses(key: string):Observable<ExpensesModel[]> {
    return this.localDataStore$;
  }

  clearLocalStorage() {
    localStorage.clear();
    this.updateLocalStore();
  }

  uploadData() {
    const url = 'https://httpdump.app/inspect/f7943c4e-390b-40fa-9023-58a69d91d7ad';
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
    });

    // Content-Type: application/json
   const localData: any = localStorage.getItem(this.activeUser);
   const localArrayData = JSON.parse(localData);
    console.log('called');
   return this.http.post(url, {body: localArrayData}, {headers}).subscribe(res => {
     console.log('res', res)
   })
  }

}
