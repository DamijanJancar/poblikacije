import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent {
  Naslov: string = ""
  Avtor: string = ""
  Leto: string = ""
  Oblika: string = ""
  Lastnik: string = ""
  Opis: string = ""
  Slika: string = ""
  Podrobnosti: string = ""
  srcResult: any;
  selectedFile!: File;
  imageUrl: string | null = null;
  isLoading = false;
  imagePath: string | null = null;
  fileName: string | null = null;
  

  constructor(private data: DataService, private router: Router, private snackbar: MatSnackBar) {
    this.IsUserLoggedIn()
  }

  async IsUserLoggedIn() {
    const result = await this.data.MyID()
    if (result == undefined || result == null) {
      this.snackbar.open(`Prosim, prijavite se ! `, "", { duration: 5000 })
      this.router.navigate(['/login'])
    }
  }

  async NewItem() {
    if (this.Naslov == "" || this.Avtor == "" || this.Leto == "" || this.Oblika == "" || this.Lastnik == "" || this.Opis == "" || this.Podrobnosti == "") {
      this.snackbar.open(`Eno ali več polj je praznih. Prosim, vpiši podatke v vsa polja.`, "", { duration: 5000 })
      //console.log(this.Naslov, this.Avtor, this.Leto, this.Oblika, this.Lastnik, this.Opis, this.Podrobnosti)
    }
    else {
      //console.log('Pred začetkom upload: ', this.imageUrl)
      if (this.imageUrl !== null) {
          this.Slika = this.imageUrl
        //console.log('Začenjam upload: ', this.imageUrl)
        //const imageName = await this.data.uploadImage(document.getElementById("img_upload",) as HTMLInputElement)
        //console.log('imageName. ', this.imageUrl)

          //const imagePath = await this.imageUrl

          //console.log('Podatki za dodajanje: ', this.Naslov, this.Avtor, this.Leto, this.Oblika, this.Lastnik, this.Opis, this.Slika, this.Podrobnosti)
          const success = await this.data.AddItemToDB(this.Naslov, this.Avtor, this.Leto, this.Oblika, this.Opis, this.Lastnik, this.Slika, this.Podrobnosti)
          //console.log('sucess: ', success)
          if (success) {
            this.snackbar.open(`Publikacija ${this.Naslov} ${this.Avtor} uspešno dodana v bazo!`, "", { duration: 5000 })
            this.router.navigate([''])
          }
          else {
            this.snackbar.open(`Pri dodajanju smo naleteli na težavo!`, "", { duration: 5000 })
            console.log('Pri dodajanju smo naleteli na težavo!')
            console.log('brišem: ', this.imageUrl)
            if (this.imagePath) {
              await this.data.deleteImage(this.imagePath);
              this.imagePath = null;
            }
            
          }
        
      }
      else {
        this.snackbar.open(`Pri nalaganju smo naleteli na težavo!`, "", { duration: 5000 })
        //console.log('Pri dodajanju smo naleteli na težavo! na koncu')
      }
    }
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
    }
  }

  async onUpload(): Promise<void> {
    if (!this.selectedFile) {
      return;
    }
    
    this.isLoading = true;

    try {
      const path = `${new Date().getTime()}_${this.selectedFile.name}`;
      const result = await this.data.uploadImage(this.selectedFile, path);
      this.imageUrl = this.data.getPublicUrl(result.path);
      this.imagePath = result.path;
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      this.isLoading = false;
    }
  }
  
}