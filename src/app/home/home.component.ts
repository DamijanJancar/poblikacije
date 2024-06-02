// src/app/home/home.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ItemComponent } from '../item/item.component';
import { NewItemComponent } from '../new-item/new-item.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent {
  public podatki!: any[]
  public columns: string[] = ['naslov', 'avtor', 'leto', 'oblika', 'opis', 'lastnik', 'slika', 'podrobnosti'];




  constructor(private dataService: DataService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) {
    this.IsUserLoggedIn()

  }

  async IsUserLoggedIn() {
    const result = await this.dataService.MyID()
    if (result == undefined || result == null) {
      this.snackbar.open(`Prosim prijavi se, da vidiš vsebino!`, "", { duration: 5000 })
      this.router.navigate(["/login"])
    }
    else{
      this.GetPodatki()
    }
  }

  GetPodatki(): void {
    this.dataService.getData().subscribe((data) => {
      console.log(data);
      this.podatki = data
    });
  }


  podrobnosti(id: number) {
    const podatek = this.podatki.find(p => p.id === id);
    this.dialog.open(ItemComponent, {

      data: podatek
    });
  }
}
