import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kategori } from '../models/Kategori';
import { Anketler } from '../models/Anketler';
import { Sonuc } from '../models/Sonuc';
import { Sorular } from '../models/Sorular';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "https://localhost:44300/api/";
constructor(
  private http:HttpClient
) { }


  KaterogiListe(){
    return this.http.get(this.apiUrl+"kategoriliste");
  }
  KategoriById(katId: number){
    return this.http.get(this.apiUrl+"kategoribyid/"+katId);
  }
  KategoriEkle(kat: Kategori){
    return this.http.post<Sonuc>(this.apiUrl+"kategoriekle", kat);
  }
  
  KategoriDuzenle(kat: Kategori){
    return this.http.put<Sonuc>(this.apiUrl+"kategoriduzenle", kat);
  }
  KategoriSil(katId: number){
    return this.http.delete <Sonuc>(this.apiUrl+"kategorisil/"+ katId );
  }
  
  AnketlerListe(){
    return this.http.get(this.apiUrl+"anketliste");
  }
  AnketlerByKatId(ankkatId: number){
    return this.http.get(this.apiUrl+"anketbykatid/"+ankkatId)
  }
  AnketlerById(ankId: number){
    return this.http.get(this.apiUrl+"anketbyid/"+ankId);
  }
  AnketlerEkle(ank: Anketler){
    return this.http.post<Sonuc>(this.apiUrl+"anketekle", ank);
  }
  AnketlerDuzenle(ank: Anketler){
    return this.http.put<Sonuc>(this.apiUrl+"anketduzenle", ank);
  }
  AnketlerSil(ankId: number){
    return this.http.delete<Sonuc>(this.apiUrl+"anketsil/"+ankId);
  }

  SoruListe(){
    return this.http.get(this.apiUrl+"soruliste")
  }

  SorularByAnkId(ankkatId: number){
    return this.http.get(this.apiUrl+"Sorubyankid/"+ankkatId)
  }

  SoruById(SorId: number){
    return this.http.get(this.apiUrl+"Sorubyid/"+SorId)
  }
  SoruEkle(Sor: Sorular){
    return this.http.post<Sonuc>(this.apiUrl+"soruekle", Sor);
  }
  SoruDuzenle(Sor: Sorular){
    return this.http.put<Sonuc>(this.apiUrl+"soruduzenle", Sor);
  }
  SoruSil(SorId: number){
    return this.http.delete<Sonuc>(this.apiUrl+"sorusil/"+SorId);
  }
}