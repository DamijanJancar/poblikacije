// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, map } from 'rxjs';
import { createClient } from '@supabase/supabase-js'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // private dataUrl = 'assets/publikacije.csv';

  constructor(private http: HttpClient) { }
  // Create a single supabase client for interacting with your database
  supabase = createClient('https://wbdklfvyymeyridfpiuc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZGtsZnZ5eW1leXJpZGZwaXVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4ODMzMjgsImV4cCI6MjAzMTQ1OTMyOH0.Nv8PJO8w5tp0gd55Zp1XuWhtRdHSnr8cjVpwveax1nc')

  getData(): Observable<any> {
    return from(this.supabase.from('knjiga').select('*')).pipe(map(data => data?.data))

  }

  CurrentUser(): Observable<string | undefined> {
    return from(this.supabase.auth.getUser()).pipe(map(user => user.data.user?.email))
  }

  Login(email: string, password: string): Observable<any> {
    return from(this.supabase.auth.signInWithPassword({
      email,
      password,
    }))
  }

  Logout() {
    return from(this.supabase.auth.signOut())
  }

  register(email: string, password: string) {
    return from(this.supabase.auth.signUp({
      email,
      password,
    }))
  }



  async deleteImage(imagePath: string): Promise<void> {
    const { error } = await this.supabase.storage.from('slike').remove([imagePath]);
    if (error) {
      throw new Error('Nismo mogli brisati slike!');
    }
  }

  async AddItemToDB(Naslov: string, Avtor: string, Leto: string, Oblika: string, Opis: string, Lastnik: string, Slika: string, Podrobnosti: String): Promise<boolean>  {
    console.log('Poskušam dodati: ', 'Naslov: ', Naslov, 'Avtor: ',Avtor, 'Leto: ',Leto, 'Oblika: ',Oblika, 'Opis: ',Opis, 'Lastnik: ',Lastnik, 'Slika: ', Slika, 'Podrobnosti: ',Podrobnosti)
    const { data, error } = await this.supabase
      .from('knjiga')
      .insert(
        { 'naslov': Naslov, 'avtor': Avtor, 'leto': Leto, 'oblika': Oblika, 'opis': Opis, 'lastnik': Lastnik, 'slika': Slika, 'podrobnosti': Podrobnosti}
        //{ 'naslov': 'test Naslov', 'avtor': 'test Avtor', 'leto': '1900', 'oblika': 'knjiga', 'opis': 'test Opis', 'lastnik': 'DJ', 'slika': 'https://wbdklfvyymeyridfpiuc.supabase.co/storage/v1/object/public/slike/1716800103809_hug.jpg', 'podrobnosti': 'test Podrobnosti'}
        //{ Naslov, Avtor, Leto, Oblika, Opis, Lastnik, Slika, Podrobnosti}
      )

    return error == null
  }

  async MyID() {
    const user = await this.supabase.auth.getUser()
    return user.data.user?.id
  }

  async GetImageURL(ImageName: string) {
    const { data } = this.supabase
      .storage
      .from('slike')
      .getPublicUrl(ImageName)

      console.log(data.publicUrl)
    return data.publicUrl
  }


  async uploadImage(file: File, path: string): Promise<any> {
    const { data, error } = await this.supabase.storage
      .from('slike')
      .upload(path, file);

    if (error) {
      throw error;
    }

    return data;
  }

  getPublicUrl(path: string): string {
    return this.supabase.storage.from('slike').getPublicUrl(path).data.publicUrl;
  }



}




