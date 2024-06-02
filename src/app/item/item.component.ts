import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}







