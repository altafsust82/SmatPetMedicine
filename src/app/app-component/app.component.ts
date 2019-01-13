import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

import { without, findIndex } from 'lodash';

library.add(faTimes, faPlus);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PetSmart Medicine';
  theList: object[];
  searchList: object[];
  orderBy: string;
  orderType: string;
  lastIndex: number;

  searchApt(query: string) {
    this.searchList = this.theList.filter(eachItem => {
      return (
        eachItem['petName'].toLowerCase().includes(query.toLowerCase()) ||
        eachItem['ownerName'].toLowerCase().includes(query.toLowerCase()) ||
        eachItem['aptNotes'].toLowerCase().includes(query.toLowerCase())
      );
    });
    this.sortItems();
  }

  handleSort(orderItem) {
    this.orderBy = orderItem.orderBy
    this.orderType = orderItem.orderType;
    this.sortItems();
  }
  sortItems() {
    let order: number;
    if (this.orderType === 'asc') {
      order = 1;
    }
    else {
      order = -1;
    }
    this.searchList.sort((a, b) => {
      if (a[this.orderBy].toLowerCase() <= b[this.orderBy].toLowerCase()) {
        return -1 * order;
      }
      if (a[this.orderBy].toLowerCase() > b[this.orderBy].toLowerCase()) {
        return 1 * order;
      }
    });
  }
  addApt(theApt: any) {
    theApt.aptId = this.lastIndex;
    this.theList.unshift(theApt);
    this.searchList.unshift(theApt);
    this.lastIndex++;

  }
  deleteApt(theApt: object) {
    this.theList = without(this.theList, theApt);
    this.searchList = without(this.theList, theApt);

  }
  updateApt(aptInfo)
  {
    let aptIndex: number;
    let modifiedAptIndex :number;
    aptIndex = findIndex(this.theList, {aptId:aptInfo.theApt.aptId});
    modifiedAptIndex = findIndex(this.searchList, {aptId:aptInfo.theApt.aptId});
    this.theList[aptIndex][aptInfo.labelName] = aptInfo.newValue;
    this.searchList[modifiedAptIndex][aptInfo.labelName] = aptInfo.newValue;
  }
  constructor(private http: HttpClient) {
    this.orderBy = 'petName';
    this.orderType = 'asc';
  }

  ngOnInit(): void {
    this.lastIndex = 0;
    this.http.get<Object[]>('../assets/data.json').subscribe(data => {
      this.theList = data.map((item: any) => {
        item.aptId = this.lastIndex++;
        return item;
      });
      this.searchList = data;
      this.sortItems();
    });

  }
}
