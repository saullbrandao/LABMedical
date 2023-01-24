import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toast: HotToastService) {}

  success(message: string) {
    this.toast.success(message, { dismissible: true });
  }

  error(message: string) {
    this.toast.error(message, { dismissible: true });
  }
}
