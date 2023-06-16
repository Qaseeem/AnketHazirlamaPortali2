import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from '../models/Sonuc';
import { AlertDialogComponent } from '../components/dialogs/alert-dialog/alert-dialog.component';

@Injectable({ 
  providedIn: 'root'
})
export class MyAlertServicesService {

  alertDialogRef!: MatDialogRef<AlertDialogComponent>;

constructor(
  public matDialog:MatDialog
) { }

AlertUygula(s: Sonuc){
var Baslik = '';
if (s.islem){
  Baslik ="İşlem Başarılı";
}else{
  Baslik = "İşlem Hatalı";
}
  this.alertDialogRef=this.matDialog.open(AlertDialogComponent, {
    width: '300px',
    height: '160px'
  });
  this.alertDialogRef.componentInstance.dialogBaslik=Baslik;
  this.alertDialogRef.componentInstance.dialogMesaj=s.mesaj;
  this.alertDialogRef.componentInstance.dialogIslem=s.islem;

  this.alertDialogRef.afterClosed().subscribe(d => {
    this.alertDialogRef = null!;
  })
}


}