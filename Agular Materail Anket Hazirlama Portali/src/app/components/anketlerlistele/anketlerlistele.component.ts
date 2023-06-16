import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Anketler } from 'src/app/models/Anketler';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertServicesService } from 'src/app/services/my-AlertServices.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { AnketlerDialogComponent } from '../dialogs/anketler-dialog/anketler-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-anketlerlistele',
  templateUrl: './anketlerlistele.component.html',
  styleUrls: ['./anketlerlistele.component.css']
})
export class AnketlerlisteleComponent implements OnInit {
  anketler! : Anketler[];
  gelenKategori! : Kategori;
  katId!: number;
  
  displayedColumns = ['AnkKatId','AnkId', 'AnkAdi', 'islemler'];
  dataSource ! : any;
  AnkKatId! :Anketler;
  confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>
  dialogRef!: MatDialogRef<AnketlerDialogComponent>;
  @ViewChild(MatSort) Sort!: MatSort;
  @ViewChild(MatPaginator) Paginator!: MatPaginator;
  

  constructor(
    public apiServis:ApiService,
    public alert:MyAlertServicesService,
    public route:ActivatedRoute,
    public matDialog : MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p){
        this.katId= p['KatId'];
        this.KategoriGetir();
        this.AnketlerListele();
      }
    });
  }

  KategoriGetir(){
    this.apiServis.KategoriById(this.katId).subscribe((d: object) => {
      this.gelenKategori = d as Kategori;
    });
  }

  AnketlerListele(){
    this.apiServis.AnketlerByKatId(this.katId).subscribe((d: Object) =>{
      this.anketler = d as Anketler[];
      this.dataSource = new MatTableDataSource(this.anketler);
  }
  )};

  Filtrele (q : any){
    var deger = q.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }
  }

  Ekle(){
    var yenikayit : Anketler = new Anketler;
    this.dialogRef = this.matDialog.open(AnketlerDialogComponent,{
      width: '400px',
      data:{
        kayit:yenikayit,
        islem: 'ekle'
      }
    });
    
    this.dialogRef.afterClosed().subscribe(d=> {
      if(d){
      this.apiServis.AnketlerEkle(d).subscribe((s: Sonuc) => {
        this.alert.AlertUygula(s);
          if(s. islem){
            this.AnketlerListele();
          
          }
      });
    }
    });
  }
  
  
  Duzenle(kayit: Anketler){
    this.dialogRef = this.matDialog.open(AnketlerDialogComponent,{
      width: '400px',
      height: '400px',
      data:{
        kayit:kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=> {
      if(d){
      kayit.AnkKatId = d.AnkKatId;
      kayit.AnkId = d.AnkId;
      kayit.AnkAdi = d.AnkAdi;


      this.apiServis.AnketlerDuzenle(kayit).subscribe((s:Sonuc) => {
        this.alert.AlertUygula(s);
      });
      }
    });
  }
  
  


  Sil(kayit: Anketler){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '200px',
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.AnkAdi + " İsimli Anket silinecek onaylıyor mısınız ?"

    this.confirmDialogRef.afterClosed().subscribe(d =>{
      if(d){
        this.apiServis.AnketlerSil(kayit.AnkId).subscribe( (s:Sonuc)=> {
          this.alert.AlertUygula(s);
          if(s. islem){
            this.AnketlerListele();
          }
        });
      }
    });
  }



}