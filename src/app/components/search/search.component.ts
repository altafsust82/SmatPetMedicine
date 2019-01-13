import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() orderBy;
  @Input() orderType;
  @Output() searchEvent = new EventEmitter<string>();
  @Output() orderEvent = new EventEmitter<object>();

  handleSearch(query: string)
  {
    this.searchEvent.emit(query);
  }

  handleSort(orderItem)
  {
    this.orderBy = orderItem.orderBy;
    this.orderType = orderItem.orderType;
    this.orderEvent.emit(orderItem);
  }
  constructor() { }

  ngOnInit() {
  }

}
