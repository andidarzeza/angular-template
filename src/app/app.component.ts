import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-template';

  chips1 = ["andi",  "test"];
  dropdown1 = ["darzeza",  "purpose"];
  onRemove(event: any): void {
    console.log(event);
    
  }

  onAdd(event: any): void {
    console.log(event);
  }
}
