import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sorular } from 'src/app/models/Sorular';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertServicesService } from 'src/app/services/my-AlertServices.service';
import { SorularDialogComponent } from '../dialogs/sorular-dialog/sorular-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-sorular',
  templateUrl: './sorular.component.html',
  styleUrls: ['./sorular.component.css']
})
export class SorularComponent implements OnInit {
  sorular!: Sorular[];
  displayedColumns = ['SorId', 'SorAnkId', 'C1_Soru', 'C2_Soru', 'C3_Soru',  'islemler'];
  dataSource : any;
  @ViewChild(MatSort) Sort!: MatSort;
  @ViewChild(MatPaginator) Paginator!: MatPaginator;
  dialogRef!:MatDialogRef<SorularDialogComponent>;
  confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>

  constructor(
    public apiservis:ApiService,
    public matDialog : MatDialog,
    public alert: MyAlertServicesService
  ) { }

  ngOnInit() {
    this.SorularListele();
  }
  SorularListele(){
    this.apiservis.SoruListe().subscribe((d: Object) =>{
      this.sorular = d as Sorular[];
      //console.log(d);
      this.dataSource = new MatTableDataSource(this.sorular);
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
    var yenikayit : Sorular = new Sorular;
    this.dialogRef = this.matDialog.open(SorularDialogComponent,{
      width: '400px',
      data:{
        kayit:yenikayit,
        islem: 'ekle'
      }
    });
    
    this.dialogRef.afterClosed().subscribe(d=> {
      if(d){
      this.apiservis.SoruEkle(d).subscribe((s: Sonuc) => {
        this.alert.AlertUygula(s);
          if(s. islem){
            this.SorularListele();
          }
      });
    }
    });


  }
  
  Duzenle(kayit: Sorular){
    this.dialogRef = this.matDialog.open(SorularDialogComponent,{
      width: '400px',
      height: '400px',
      data:{
        kayit:kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=> {
      if(d){
      kayit.SorId = d.SorId;
      kayit.SorAnkId = d.SorAnkId;
      kayit.C1_Soru = d.C1_Soru;
      kayit.C2_Soru = d.C2_Soru;
      kayit.C3_Soru = d.C3_Soru;



      this.apiservis.SoruDuzenle(kayit).subscribe((s:Sonuc) => {
        this.alert.AlertUygula(s);
      });
      }
    });
  }
  Sil(kayit: Sorular){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '200px',
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.SorId + " ID`li Soru silinecek onaylıyor mısınız ?"

    this.confirmDialogRef.afterClosed().subscribe(d =>{
      if(d){
        this.apiservis.SoruSil(kayit.SorId).subscribe( (s:Sonuc)=> {
          this.alert.AlertUygula(s);
          if(s. islem){
            this.SorularListele();
          }
        });
      }
    });
  }
}
