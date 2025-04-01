import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from "./shared/components/toaster/toast.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
    imports: [RouterOutlet, ToastComponent]
})

export class AppComponent {
  title = 'NgLibraryUI';
}
