import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewRef } from '@angular/core';
import { ExpensesFormComponent } from '../../components/expenses-form/expenses-form.component';
import { LocalService } from 'src/app/services/local.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { CategoryEnum, ExpensesModel, SortQueryModel } from 'src/app/models/expenses.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  @ViewChild('expensesForm', {read: ExpensesFormComponent}) expensesForm: any;
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  expenseData: ExpensesModel[] = [];
  categories = CategoryEnum;
  descriptionSort: any = 'desc';
  priceSort: any = 'desc';
  dateSort: any = 'desc';
  sortQuery: SortQueryModel = {titleType: '', sort: ''};
  sortActive: boolean = false;
  constructor(private localService: LocalService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
      this.getExpenseData();
      this.categories.food;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getExpenseData() {
    this.localService.getExpenses('user').pipe(takeUntil(this.destroy$)).subscribe(result => {
      console.log({result});
        this.expenseData = this.sortUtil(this.sortQuery, result);
        if(this.cdr && !(this.cdr as ViewRef)?.destroyed) {
          this.cdr.detectChanges();
        }
    });
  }

  editExpenses(data: ExpensesModel) {
    this.expensesForm.expenseFromGroup = new FormGroup({
      desc: new FormControl(data.desc, Validators.required),
      price: new FormControl(data.price, Validators.required),
      category: new FormControl(data.category),
      date: new FormControl(data.date, Validators.required)
    });
    this.expensesForm.editData(data.id);
  }

  deleteExpenses(id: any) {
    if (confirm("Are sure you want to delete!")) {
      this.localService.deleteExpenses(id);
    } 
  }

  clearData() {
    this.localService.clearLocalStorage();
  }

  showForm() {
    this.expensesForm.addData();
  }

  sortSwitchUtil(sortByTitle: string) {
    switch (sortByTitle) {
      case 'description':
        this.sortQuery = {titleType: 'desc', sort: this.descriptionSort = this.switchSort(this.descriptionSort)};
        this.expenseData = this.sortUtil(this.sortQuery, this.expenseData);
      break;
      case 'price':
        this.sortQuery = {titleType: 'price', sort: this.priceSort = this.switchSort(this.priceSort)};
        this.expenseData = this.sortUtil(this.sortQuery, this.expenseData);
      break;
      
      case 'date':
        this.sortQuery = {titleType: 'date', sort: this.dateSort = this.switchSort(this.dateSort)};
        this.expenseData = this.sortUtil(this.sortQuery, this.expenseData);
      break;
      default:
        break;
    }
  }

  sortUtil(sortQuery: SortQueryModel, data: ExpensesModel[]) {
    return  sortQuery.titleType ? _.orderBy(data, [item => 
      sortQuery.titleType === 'desc' ? _.get(item, sortQuery.titleType)?.toLowerCase() : 
      _.get(item, sortQuery.titleType)], sortQuery.sort) : data;
  }

  switchSort(key: string) {
    return key === 'desc' ? 'asc' : 'desc'
  }

  updloadData() {
    this.localService.uploadData();
  }

}
