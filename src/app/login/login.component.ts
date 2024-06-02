import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import {MatFormFieldModule, } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  geslo: string = '';


  constructor(private data: DataService, private router: Router, private snackbar:MatSnackBar) {
    this.IsUserLoggedIn()
  }


  login() {
    this.data.Login(this.email, this.geslo).subscribe((data) => {
      this.snackbar.open(`Uspešna prijava kot ${this.email}`, "", {duration:5000})
      this.router.navigate(['']);
    });
  }
  
  async IsUserLoggedIn() {
    const result = await this.data.MyID()
    if (result != undefined && result != null) {
      this.snackbar.open(`Si že prijavljen. Če želiš drugo prijavo, se prej odjavi! ` , "", {duration:5000})
      this.router.navigate([''])
    }
  }

}
