import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Modal } from '../../../models/modal';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input({required: true}) show: boolean = true;
  @Input({required: true}) modal!: Modal;
  @Output() onConfirmOrCancel = new EventEmitter<boolean>;

  toggleModal() {
    this.show = !this.show;
  }
  closeModal() {
    this.onConfirmOrCancel.emit(false);
    this.show = false;
  }
  submitFunction() {
    this.onConfirmOrCancel.emit(true);
    this.closeModal();
  }
}
