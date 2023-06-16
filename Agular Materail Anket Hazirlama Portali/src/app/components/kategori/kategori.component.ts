import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';
import { KategoriDialogComponent } from '../dialogs/kategori-dialog/kategori-dialog.component';
import { MyAlertServicesService } from 'src/app/services/my-AlertServices.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.css']
})
export class KategoriComponent implements OnInit {
  kategoriler!: Kategori[];
  displayedColumns = ['KatId', 'KatAdi', 'KatAnketSayisi', 'islemler'];
  dataSource : any;
  @ViewChild(MatSort) Sort!: MatSort;
  @ViewChild(MatPaginator) Paginator!: MatPaginator;
  dialogRef!:MatDialogRef<KategoriDialogComponent>;
  confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>

  constructor(
    public apiservis:ApiService,
    public matDialog : MatDialog,
    public alert: MyAlertServicesService
  ) { }

  ngOnInit() {
    this.KategoriListele();
  }
  KategoriListele(){
    this.apiservis.KaterogiListe().subscribe((d: Object) =>{
      this.kategoriler = d as Kategori[];
      //console.log(d);
      this.dataSource = new MatTableDataSource(this.kategoriler);
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
    var yenikayit : Kategori = new Kategori;
    this.dialogRef = this.matDialog.open(KategoriDialogComponent,{
      width: '400px',
      data:{
        kayit:yenikayit,
        islem: 'ekle'
      }
    });
    
    this.dialogRef.afterClosed().subscribe(d=> {
      if(d){
      this.apiservis.KategoriEkle(d).subscribe((s: Sonuc) => {
        this.alert.AlertUygula(s);
          if(s. islem){
            this.KategoriListele();
          }
      });
    }
    });
  }
  
  Duzenle(kayit: Kategori){
    this.dialogRef = this.matDialog.open(KategoriDialogComponent,{
      width: '400px',
      height: '400px',
      data:{
        kayit:kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=> {
      if(d){
      kayit.KatId = d.KatId;
      kayit.KatAdi = d.KatAdi;

      this.apiservis.KategoriDuzenle(kayit).subscribe((s:Sonuc) => {
        this.alert.AlertUygula(s);
      });
      }
    });
  }
  Sil(kayit: Kategori){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '200px',
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.KatAdi + " İsimli kategori silinecek onaylıyor mısınız ?"

    this.confirmDialogRef.afterClosed().subscribe(d =>{
      if(d){
        this.apiservis.KategoriSil(kayit.KatId).subscribe( (s:Sonuc)=> {
          this.alert.AlertUygula(s);
          if(s. islem){
            this.KategoriListele();
          }
        });
      }
    });
  }
}
