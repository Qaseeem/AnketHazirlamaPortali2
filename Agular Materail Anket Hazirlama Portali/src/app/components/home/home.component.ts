import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertServicesService } from 'src/app/services/my-AlertServices.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public alert:MyAlertServicesService,
    public matDialog:MatDialog
  ) { }

  ngOnInit() {
  }
  AlertAc(p:boolean){
    var s:Sonuc=new Sonuc();
    s.islem=p;
    s.mesaj="Bu Bir Alert Mesajidir..."

    this.alert.AlertUygula(s);
  }

  confirmAc(){
    this.confirmDialogRef= this.matDialog.open(ConfirmDialogComponent,{
      width: '300px',
      height: '160px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj="Kayıt Silinecektir Onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d =>{
      console.log(d);
      if(d){
        //Silme Rutini
      }
    });
  }

}
