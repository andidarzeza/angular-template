import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-template';
  chips1: any[] = [];
  dropdown1: any[] = [];
  constructor() {
    for(let i = 0;i<10;i++) {
      this.dropdown1.push({
        name: "name " + i
      })
    }

    for(let i = 0;i<2;i++) {
      this.chips1.push({
        name: "chip " + i
      })
    }
  }
  onRemove(event: any): void {
    console.log(event);
    
  }

  onAdd(event: any): void {
    console.log(event);
  }
}
