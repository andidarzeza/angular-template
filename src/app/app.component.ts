import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-template';
  chips1: any[] = [
    {
      name: "Verifica Manuale"
    },
    {
      name: "Targa Errata"
    }
  ];
  dropdown1: any[] = [
    {
      name: "Classe Violazione"
    },
    {
      name: "Entrata Mancante"
    },
    {
      name: "Classe Violazione non corrispondente"
    },
    {
      name: "Uscita Mancante"
    },
    {
      name: "Velocita Mancante"
    },
    {
      name: "Plate Check"
    },
    {
      name: "Viaggio Incompleto"
    }
  ];
  public form: FormGroup;
  constructor(public fb: FormBuilder) {
    this.form = this.fb.group({
      items: [[]]
    })
    // for(let i = 0;i<10;i++) {
    //   this.dropdown1.push({
    //     name: "name " + i
    //   })
    // }

    // for(let i = 0;i<2;i++) {
    //   this.chips1.push({
    //     name: "chip " + i
    //   })
    // }
  }
  onRemove(event: any): void {
    console.log(event);
    
  }

  onAdd(event: any): void {
    console.log(event);
  }
}
