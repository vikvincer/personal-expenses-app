import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalService } from 'src/app/services/local.service';
import {CategoryConfig } from '../../configs/cateogy.config'

@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.scss']
})
export class ExpensesFormComponent implements OnInit {

  // Initialize formgroup values
  expenseFromGroup = new FormGroup({
    desc: new FormControl('', Validators.required),
    price: new FormControl('',  Validators.required),
    category: new FormControl(null),
    date: new FormControl(null, [Validators.required])
  });

  categories = CategoryConfig;
  show:boolean = false;
  isSubmitted: boolean = false;
  editMode: boolean = false;
  dataId: string = '';
  constructor(private localService: LocalService) { }

  ngOnInit(): void {
  }

  saveData() {
    if(!this.expenseFromGroup.valid) return;
    if (this.isSubmitted) return;
    if(this.editMode) {
      this.localService.updateExpenses(this.dataId,this.expenseFromGroup.value);
    } else {
      this.localService.saveExpenses(this.expenseFromGroup.value);
    }
    this.isSubmitted = true;
    this.show = false;
    this.expenseFromGroup.reset();
  }

  editData(id: string) {
    this.editMode = true;
    this.dataId = id;
    this.show = true;
    this.isSubmitted = false;
  }

  addData() {
    this.isSubmitted = false;
    this.show = true;
    this.editMode = false;
  }
  closeForm() {
    this.expenseFromGroup.reset();
    this.isSubmitted = false;
    this.show = false;
    this.editMode = false;
  }
}
