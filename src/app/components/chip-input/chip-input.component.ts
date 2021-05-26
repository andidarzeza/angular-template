import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss']
})
export class ChipInputComponent implements OnInit {

  constructor() { }

  // Control Variables 
  public showDropdown = false;

  chips: string[] = ["Missing Speed", "Class Missmatch"];
  dropdownItems: string[] = ["Plate Check", "Manual Verification"];
  ngOnInit(): void {
  }
  
  addChip(chip: string): void {
    this._pushItemToChips(chip);
    this._removeItemFromDropdown(chip);
  }

  removeChip(chip: string): void {
    this._removeItemFromChips(chip);
    this._pushItemToDropdown(chip);
  }

  onInputFocus(): void {
    this.showDropdown = true;
  }

  onInputOutFocus(): void {
    // this.showDropdown = false;
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

  private _removeItemFromArray(array: any[], item: any): any[] {
    const index = array.indexOf(item);
    if(index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

}
