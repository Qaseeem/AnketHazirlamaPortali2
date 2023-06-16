import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sorular } from 'src/app/models/Sorular';

@Component({
  selector: 'app-sorular-dialog',
  templateUrl: './sorular-dialog.component.html',
  styleUrls: ['./sorular-dialog.component.css']
})
export class SorularDialogComponent implements OnInit {
dialogBaslik!: string;
  islem!: string;
  frm!: FormGroup;
  yenikayit!: Sorular;
  constructor(
    public matDialog:MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef:MatDialogRef<SorularDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any

  ) { 
    this.islem = data.islem;
    this.yenikayit = data.kayit;
    if(this.islem == 'ekle'){
      this.dialogBaslik = 'Soru Ekle';
    }
    if(this.islem == 'duzenle'){
      this.dialogBaslik = 'Soru Düzenle'
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      SorId: [this.yenikayit.SorId],
      SorAnkId: [this.yenikayit.SorAnkId],
      C1_Soru: [this.yenikayit.C1_Soru],
      C3_Soru: [this.yenikayit.C2_Soru],
      C2_Soru: [this.yenikayit.C3_Soru]

    });
  }


}
