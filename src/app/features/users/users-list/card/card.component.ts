import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Output() $delete = new EventEmitter();
  @Output() $view = new EventEmitter();
  @Input() fullName: string = '';
  @Input() email: string = '';
  onView(){
    this.$view.emit()
  }
  onDelete(){
    this.$delete.emit()
  }
}
