import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { BackdropComponent } from './backdrop/backdrop.component';



@NgModule({
  declarations: [NavbarComponent, BackdropComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  exports: [NavbarComponent, BackdropComponent]
})
export class SharedModule { }
