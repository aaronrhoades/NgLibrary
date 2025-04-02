import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from "./shared/components/toast/toast.component";
import { RentalToolbarComponent } from "./rental/rental-toolbar/rental-toolbar.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
    imports: [
      RouterOutlet,
      ToastComponent, 
      RentalToolbarComponent,
    ]
})

export class AppComponent {
  title = 'NgLibraryUI';
}
