import { Injectable, Signal, signal } from '@angular/core';
import { Toast } from '../../models/toast';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = signal<Toast[]>([]);
  
  constructor() {
  }

  getToast() : Signal<Toast[]> {
    return this.toasts.asReadonly();
  }

  updateToast(newToast: Toast) {
    newToast.id = uuidv4();
    this.toasts.update(toasts => {
      toasts.push(newToast);
      return toasts;
    });
    setTimeout(() => this.removeToast(newToast), newToast.duration)
  }

  removeToast(toast:Toast) {
    this.toasts.update(value => value.filter(t => t.id !== toast.id));
  }
}
