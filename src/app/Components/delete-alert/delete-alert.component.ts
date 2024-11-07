import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-alert',
  standalone: true,
  imports: [],
  templateUrl: './delete-alert.component.html',
  styleUrl: './delete-alert.component.css'
})
export class DeleteAlertComponent {
  @Output() yesDel = new EventEmitter<any>();
  @Output() noDel = new EventEmitter<any>();

  yesDelete(){
    this.yesDel.emit();
  }
  
  noDelete(){
    this.noDel.emit();
  }
}
