import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() aptList;
  @Output() deleteEvent = new EventEmitter();
  @Output() updateEvent = new EventEmitter();
  handleDelete(theApt: object) {
    console.log(theApt);
    this.deleteEvent.emit(theApt);
  }
  handleUpdate(theApt: object, labelName: string, newValue:string){
    this.updateEvent.emit({
      theApt: theApt,
      labelName: labelName,
      newValue: newValue
    });
  }
}
