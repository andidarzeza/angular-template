import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() options: any[] = [];
  @Output() valueChanged = new EventEmitter();
  selectedOption = 0;
  optionWidth = 150;
  constructor() { }

  ngOnInit(): void {
  }

  changeValue(option: any, slider: any): void {
    const index = this.options?.indexOf(option);
    if(index > -1) {
      this.selectedOption = index;
      const slideLeft = index * this.optionWidth;
      if(slider) {
        slider.style.transform = `translateX(${slideLeft}px)`;
      }
      this.valueChanged.emit(this.options[this.selectedOption]);
    }
  }

}
