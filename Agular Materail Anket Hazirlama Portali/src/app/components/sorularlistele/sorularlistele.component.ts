import { Component, OnInit, ViewChild } from '@angular/core';
import { Anketler } from 'src/app/models/Anketler';
import { Sorular } from 'src/app/models/Sorular';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SorularDialogComponent } from '../dialogs/sorular-dialog/sorular-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertServicesService } from 'src/app/services/my-AlertServices.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-sorularlistele',
  templateUrl: './sorularlistele.component.html',
  styleUrls: ['./sorularlistele.component.css']
})
export class SorularlisteleComponent implements OnInit {
  sorular! : Sorular[];
  gelenanketler! : Anketler;
  AnkId!: number;
  displayedColumns = ['SorId','SorAnkId', 'C1_Soru','C2_Soru','C3_Soru', 'islemler'];
  dataSource ! : any;
  SorAnkId! :Sorular;
  confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>
  dialogRef!: MatDialogRef<SorularDialogComponent>;
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
        this.AnkId= p['AnkId'];
        this.AnketlerGetir();
        this.SorularListele();
      }
    });
  }

  AnketlerGetir(){
    this.apiServis.AnketlerById(this.AnkId).subscribe((d: object) => {
      this.gelenanketler = d as Anketler;
    });
  }

  SorularListele(){
    this.apiServis.SorularByAnkId(this.AnkId).subscribe((d: Object) =>{
      this.sorular = d as Sorular[];
      this.dataSource = new MatTableDataSource(this.sorular);
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
      this.apiServis.SoruEkle(d).subscribe((s: Sonuc) => {
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



      this.apiServis.SoruDuzenle(kayit).subscribe((s:Sonuc) => {
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
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.SorId + " Id`li Soru silinecek onaylıyor musunuz ?"

    this.confirmDialogRef.afterClosed().subscribe(d =>{
      if(d){
        this.apiServis.SoruSil(kayit.SorId).subscribe( (s:Sonuc)=> {
          this.alert.AlertUygula(s);
          if(s. islem){
            this.SorularListele();
          }
        });
      }
    });
  }


}
