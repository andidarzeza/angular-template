import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChipInputComponent } from './components/chip-input/chip-input.component';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MiddleClickDirective } from './directives/middle-click.directive';
import { ToggleComponent } from './components/toggle/toggle.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SliderComponent } from './components/slider/slider.component';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ChipInputComponent,
    MiddleClickDirective,
    ToggleComponent,
    CheckboxComponent,
    SliderComponent,
    PhotoGalleryComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
