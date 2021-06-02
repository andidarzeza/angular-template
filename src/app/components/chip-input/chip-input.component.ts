import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chip-input',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('100ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('100ms', style({opacity: 0}))
        ])
      ]
    )],
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss']
})
export class ChipInputComponent implements OnInit {
  @Output() onAdd: EventEmitter<any> = new EventEmitter();
  @Output() onRemove: EventEmitter<any> = new EventEmitter();
  constructor() { }
  
  // randomIds
  // TODO: implement function to implement random id.
  public randomId = "test1234";
  private styledChipId = "";

  // Control Variables 
  public showDropdown = false;
  chips: string[] = ["Missing Speed", "Class Missmatch"];
  dropdownItems: string[] = ["Plate Check", "Manual Verification","Plate Check", "Manual Verification","Plate Check", "Manual Verification","Plate Check", "Manual Verification","Plate Check", "Manual Verification","Plate Check", "Manual Verification"
,"Plate Check", "Manual Verification","Plate Check", "Manual Verification","Plate Check", "Manual Verification"];
  ngOnInit(): void {
  }
  
  addChip(chip: string): void {
    this._pushItemToChips(chip);
    this._removeItemFromDropdown(chip);
    this._setFocusToInput();
    this._startInputAnimation();
    this._showDropdown();
    this._showDropdown();
    this.onAdd.emit(chip);
  }

  removeChip(chip: string): void {
    this._removeItemFromChips(chip);
    this._pushItemToDropdown(chip);
    this._setFocusToInput();
    this._startInputAnimation();
    this._showDropdown();
    this.onRemove.emit(chip);
  }

  onInputFocus(): void {
    this._showDropdown();
    this._changeUnderlineStyle();
  }

  onInputOutFocus(): void {
    this._hideDropdown();
    this._changeUnderlineStyle(true);
  }

  setChipStyle(id: string): void {
    const chipText = document.getElementById('text-' + id) as HTMLElement;
    const chipIcon = document.getElementById('icon-' + id) as HTMLElement;
    const chip = document.getElementById(id) as HTMLElement;
    
    if(chip && chipText && chipIcon) {
      setTimeout(() => {
        this.styledChipId = id;
      }, 200);
      chip.style.background = "#2196f3";
      chipText.style.color = "white";
      chipIcon.style.color = "white";
    }
  }

  private _showDropdown(): void {
    setTimeout(()=> {
      this.showDropdown = true;
    }, 200);
  }

  private _hideDropdown(): void {
    setTimeout(()=> {
      this.showDropdown = false;
    }, 200);
  }

  private _pushItemToChips(chip: string): void {
    this.chips.push(chip);
  }

  private _pushItemToDropdown(chip: string): void {
    this.dropdownItems.push(chip);
  }

  private _removeItemFromDropdown(chip: string): void {
    this.dropdownItems = this._removeItemFromArray(this.dropdownItems, chip);
  }

  private _removeItemFromChips(chip: string): void {
    this.chips = this._removeItemFromArray(this.chips, chip);
  }

  private _changeUnderlineStyle(def?: boolean): void {
    const input = document.getElementById("input-" + this.randomId);
    const chip = document.getElementById("chip-container" + this.randomId);
    if(def) {
      if(input && chip) {
        chip.style.borderBottom = "2px solid lightgray";
        input.style.borderBottom = "2px solid lightgray";
      }
    } else {
      if(input && chip) {
        chip.style.borderBottom = "2px solid #2196f3";
        input.style.borderBottom = "2px solid #2196f3";
      }
    }
  }

  private _setFocusToInput(): void {
    const input = document.getElementById("input-" + this.randomId);
    if(input) {
      input.focus();
    }
  }

  private _startInputAnimation(): void {
    this._changeUnderlineStyle(true);
    setTimeout(() => {
      this._changeUnderlineStyle();
    },200);
  }

  private _removeItemFromArray(array: any[], item: any): any[] {
    const index = array.indexOf(item);
    if(index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  @HostListener('document:click', ['$event.target'])
  onClick(event: any) {
    if(event?.id !== this.styledChipId && event?.id !== 'text-' + this.styledChipId) {
      const styledChipIcon = document.getElementById('icon-' + this.styledChipId) as HTMLElement;
      const styledChipText = document.getElementById('text-' + this.styledChipId) as HTMLElement;
      const styledChip = document.getElementById(this.styledChipId) as HTMLElement;

      if(styledChip && styledChipText && styledChipIcon) {
        styledChip.style.background = "#efefef";
        styledChipText.style.color = "black";
        styledChipIcon.style.color = "gray";
      }  
    }
 }

}
