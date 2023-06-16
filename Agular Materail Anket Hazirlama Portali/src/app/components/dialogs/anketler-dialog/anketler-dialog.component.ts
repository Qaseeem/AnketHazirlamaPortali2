import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Anketler } from 'src/app/models/Anketler';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-anketler-dialog',
  templateUrl: './anketler-dialog.component.html',
  styleUrls: ['./anketler-dialog.component.css']
})
export class AnketlerDialogComponent implements OnInit {
  dialogBaslik!: string;
  islem!: string;
  frm!: FormGroup;
  yenikayit!: Anketler;
  constructor(
    public matDialog:MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef:MatDialogRef<AnketlerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any

  ) { 
    this.islem = data.islem;
    this.yenikayit = data.kayit;
    if(this.islem == 'ekle'){
      this.dialogBaslik = 'Anket Ekle';
    }
    if(this.islem == 'duzenle'){
      this.dialogBaslik = 'Anket Düzenle'
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      AnkKatId: [this.yenikayit.AnkKatId],
      AnkId: [this.yenikayit.AnkId],
      AnkAdi: [this.yenikayit.AnkAdi]

    });
  }

}

