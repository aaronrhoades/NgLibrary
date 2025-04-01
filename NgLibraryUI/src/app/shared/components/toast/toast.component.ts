import { Component, effect, inject, Signal } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { Toast } from '../../../models/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  toastService = inject(ToastService);
  toasts: Signal<Toast[]> = this.toastService.getToast();

  //example function, could be used for testing with a button in ToastComponent
  public showToast(toast:Toast) {
    this.toastService.updateToast(toast);
  }
  public removeToast(toast: Toast) {
    this.toastService.removeToast(toast);
  }
}
