import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = 'Ni vpisanega uporabnika';
  constructor(private data:DataService, private router:Router, private snackbar: MatSnackBar){
    data.CurrentUser().subscribe(user => this.user = user??'Ni vpisanega uporabnika')
  }
 logout(){
  this.data.Logout().subscribe((response) => {
    this.user = 'Ni vpisanega uporabnika'
    this.snackbar.open(`Uporabnik odjavljen!`, "", { duration: 5000 })
    this.router.navigate(['/login']);
  })
 }
}


