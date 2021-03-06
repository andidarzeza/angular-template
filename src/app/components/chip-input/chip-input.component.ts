import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
    ),
    trigger(
      'chipAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('180ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({width: 100}),
          animate('120ms', style({width: 0}))
        ])
      ]
    )],
    providers: [
      { 
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ChipInputComponent),
        multi: true
      }
    ],
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss']
})
export class ChipInputComponent implements OnInit, ControlValueAccessor {
  @Output() onAdd: EventEmitter<any> = new EventEmitter();
  @Output() onRemove: EventEmitter<any> = new EventEmitter();
  toRemove = false;
  previousValue = "";
  constructor() { }
  propagateChange = (_: any) => {};
  writeValue(obj: any): void {
    if(obj)
    this.chips = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(): void {
    
  }
  
  // randomIds
  public randomId = this._uuidv4();
  private styledChipId = "";

  // Control Variables 
  public showDropdown = false;
  // input variables
  @Input() chips: any[] = [];
  @Input() dropdownItems: any[] = [];
  @Input() displayBy = "";
  @Input() placeholder = "";
  @Input() maxChips = 999;
  @Input() middleClickRemove = false;
  // container variables;
  private _temporaryChipHolder: any[] = [];
  private _selectedItemWithArrow: any = null;

  // reference variables;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef = new ElementRef("searchInput");
  ngOnInit(): void {
    this._temporaryChipHolder = this.dropdownItems;
  }
  
  addChip(chip: string): void {
    if(this.chips.length < this.maxChips) {
      this._pushItemToChips(chip);
      this._removeItemFromDropdown(chip);
      this._setFocusToInput();
      this._startInputAnimation();
      this._showDropdown();
      this.onAdd.emit(chip);
      this.propagateChange(this.chips);
    }
  }

  removeChip(chip: any, index: number): void {
    this.toRemove = false;
    this._resetInputValue();
    this._resetDropDownItems();
    setTimeout(() => {
      this._startRemovingStyle(index);

      this._removeStyleFromChip();
      this._removeItemFromChips(chip);
      this._pushItemToDropdown(chip);
      this._setFocusToInput();
      this._startInputAnimation();
      this._showDropdown();
      this.onRemove.emit(chip);
      this.propagateChange(this.chips);
    }, 120);
  }

  private _resetDropDownItems(): void {
    this.dropdownItems = this._temporaryChipHolder;
  }

  private _resetInputValue(): void {
    this.searchInput.nativeElement.value = "";
  }

  private _startRemovingStyle(i: number): void {
    // const chipId = 'chip-' + i + '-' + this.randomId;
    const chipTextId = 'text-chip-' + i + '-' + this.randomId;
    const iconId = 'icon-chip-' + i + '-' + this.randomId;
    // const chip = document.getElementById(chipId) as HTMLElement;
    const chipText = document.getElementById(chipTextId) as HTMLElement;
    const icon = document.getElementById(iconId) as HTMLElement;
    if(chipText && icon) {
      // const num = chip.offsetWidth;
      chipText.style.display = 'none';
      icon.style.display = 'none';
      // chip.style.width = num + 'px';
      // setTimeout(() => {
        // chip.style.width = '0px';
      // }, 10);
    }
    
  }

  onInputFocus(): void {
    this.toRemove = false;
    this._showDropdown();
    this._changeUnderlineStyle();
  }

  onInputOutFocus(): void {
    this.toRemove = false;
    this._selectedItemWithArrow = null;
    this._hideDropdown();
    this._changeUnderlineStyle(true);
  }

  onChipClick(id: string, background?: string): void {
    this._setChipStyle(id, background);
  }

  onMiddleClick(event: any, chip: any, index: number): void {
    if(this.middleClickRemove) {
      this.removeChip(chip, index);
    }
  }

  private _setChipStyle(id: string, background?: string): void {
    const chipText = document.getElementById('text-' + id) as HTMLElement;
    const chipIcon = document.getElementById('icon-' + id) as HTMLElement;
    const chip = document.getElementById(id) as HTMLElement;
    
    if(chip && chipText && chipIcon) {
      setTimeout(() => {
        this.styledChipId = id;
      }, 200);
      chip.style.background = background? background : "#2196f3";
      chipText.style.color = "white";
      chipIcon.style.color = "white";
    }
  }

  getDisplayValue(input: any): any {
    let val = "";
    const array = this.displayBy.split(".");
    let firstTime = true;
    array.forEach((item: any) => {
      if(firstTime) {
        val = input[item];
        firstTime = false;  
      } else  {
        val = val[item];
      }
    });    
    return val;
  }

  onkeyDown(event: any): void {
    this.previousValue = event.srcElement.value;
  }

  onKeyUp(event: any): void {    
    if(event.srcElement.value === "") {
      this._resetDropDownItems();
    } else {
      this._filterDropDownChipsStartingWith(event.srcElement.value);
    }
    setTimeout(()=> {      
      if(event.key === "Backspace" && this.chips.length > 0) {
        if(this.previousValue === "") {
          const lastIndex = this.chips.length - 1;
          this._setChipStyle('chip-' + lastIndex + '-' + this.randomId);
          this._unfocusInput();
          this.toRemove = true;
        }
      } else if(event.key === "ArrowDown") {
        if(this.showDropdown) {
          if(this._selectedItemWithArrow) {
            const index = this.dropdownItems.indexOf(this._selectedItemWithArrow);
            if(this.dropdownItems[index + 1]) {
              this._selectedItemWithArrow = this.dropdownItems[index + 1];
              const doc = document.getElementById("dropdown-" + this.randomId) as HTMLElement;
              if(doc) {
                const childs = doc.childNodes;
                const item = childs[index + 1] as any;
                const prev = childs[index] as any;
                item.classList.add("onArrowStyle"); 
                prev.classList.remove("onArrowStyle"); 
              }
            }
          } else {
            this._selectedItemWithArrow = this.dropdownItems[0];
            const doc = document.getElementById("dropdown-" + this.randomId) as HTMLElement;
            if(doc) {
              const childs = doc.childNodes;
              const item = childs[0] as any;
              item.classList.add("onArrowStyle"); 

            }
          }          
        }
      } else if(event.key === "ArrowUp") {
        if(this.showDropdown) {
          if(this._selectedItemWithArrow) {
            const index = this.dropdownItems.indexOf(this._selectedItemWithArrow);
            if(this.dropdownItems[index - 1]){
              this._selectedItemWithArrow = this.dropdownItems[index - 1];
              const doc = document.getElementById("dropdown-" + this.randomId) as HTMLElement;
              if(doc) {
                const childs = doc.childNodes;
                const item = childs[index - 1] as any;
                const prev = childs[index] as any;
                item.classList.add("onArrowStyle"); 
                prev.classList.remove("onArrowStyle"); 
              }
            }
          } else {
            this._selectedItemWithArrow = this.dropdownItems[0];
            const doc = document.getElementById("dropdown-" + this.randomId) as HTMLElement;
            if(doc) {
              const childs = doc.childNodes;
              const item = childs[0] as any;
              item.classList.add("onArrowStyle");
            }
          }          
        }
      } else if(event.key === "Enter") {
        if(this._selectedItemWithArrow) {
          const index = this.dropdownItems.indexOf(this._selectedItemWithArrow);
          if(index > -1) {
            this.addChip(this.dropdownItems[index]);
            this._selectedItemWithArrow = null;
          }
        }
      }
    }, 50);
  }

  private _filterDropDownChipsStartingWith(value: string): void {    
    this.dropdownItems = this._temporaryChipHolder.filter((chip: any) => {
      return chip[this.displayBy]?.toLowerCase().includes(value?.toLowerCase());
    })
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

  private _unfocusInput(): void {
    const input = document.getElementById("input-" + this.randomId);
    if(input) {
      input.blur();
      this.toRemove = false;
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

  private _uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private _removeStyleFromChip(): void  {
    const styledChipIcon = document.getElementById('icon-' + this.styledChipId) as HTMLElement;
    const styledChipText = document.getElementById('text-' + this.styledChipId) as HTMLElement;
    const styledChip = document.getElementById(this.styledChipId) as HTMLElement;

    if(styledChip && styledChipText && styledChipIcon) {
      styledChip.style.background = "#efefef";
      styledChipText.style.color = "black";
      styledChipIcon.style.color = "gray";
    }  
  }

  @HostListener('document:click', ['$event.target'])
  onClick(event: any) {
    if(event?.id !== this.styledChipId && event?.id !== 'text-' + this.styledChipId) {
      this._removeStyleFromChip();
    }
 }

 @HostListener('document:keydown.backspace', ['$event']) onKeydownHandler(event: KeyboardEvent) {
  if(this.toRemove  && this.chips.length > 0) {
    const lastIndex = this.chips.length - 1;
    const chip = this.chips[lastIndex];
    this.removeChip(chip, lastIndex);
  }
}

}
