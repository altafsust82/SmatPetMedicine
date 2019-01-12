import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  showForm: boolean = true;
  toggleAptDisplay() {
    this.showForm = !this.showForm;
  }
  handleAdd(formInfo: any) {
    const tempItem: object = {
      petName: formInfo.petName,
      ownerName: formInfo.ownerName,
      aptDate: formInfo.aptDate + ' ' + formInfo.aptTime,
      aptNotes: formInfo.aptNotes
    };
  }
  constructor() {
    this.showForm = true;
  }

  ngOnInit() {
  }

}
