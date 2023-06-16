import { Component, OnInit, ViewChild } from '@angular/core';
import { Anketler } from 'src/app/models/Anketler';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertServicesService } from 'src/app/services/my-AlertServices.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sonuc } from 'src/app/models/Sonuc';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { AnketlerDialogComponent } from '../dialogs/anketler-dialog/anketler-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-anketler',
  templateUrl: './anketler.component.html',
  styleUrls: ['./anketler.component.css']
})
export class AnketlerComponent implements OnInit {
  anketler!: Anketler[];
  displayedColumns = ['AnkKatId', 'AnkId', 'AnkAdi','AnkSoruSayisi', 'islemler'];
  dataSource : any;
  @ViewChild(MatSort) Sort!: MatSort;
  @ViewChild(MatPaginator) Paginator!: MatPaginator;
  dialogRef!:MatDialogRef<AnketlerDialogComponent>;
  confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>

  constructor(
    public apiservis:ApiService,
    public matDialog : MatDialog,
    public alert: MyAlertServicesService
  ) { }

  ngOnInit() {
    this.AnketlerListele();
  }
  AnketlerListele(){
    this.apiservis.AnketlerListe().subscribe((d: Object) =>{
      this.anketler = d as Anketler[];
      //console.log(d);
      this.dataSource = new MatTableDataSource(this.anketler);
      this.dataSource.sort = this.Sort;
      this.dataSource.paginator = this.Paginator;
    });
  }

  Filtrele (q : any){
    var deger = q.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
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
      this.apiservis.AnketlerEkle(d).subscribe((s: Sonuc) => {
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


      this.apiservis.AnketlerDuzenle(kayit).subscribe((s:Sonuc) => {
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
        this.apiservis.AnketlerSil(kayit.AnkId).subscribe( s=> {
          this.alert.AlertUygula(s);
          if(s. islem){
            this.AnketlerListele();
          }
        });
      }
    });
  }

}
