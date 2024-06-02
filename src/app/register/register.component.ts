import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  geslo: string = '';

  constructor(private data: DataService, private router: Router) {}

  register() {
    this.data.register(this.email, this.geslo).subscribe((data) => {
      this.router.navigate(['/login']);
    });
  }
}
