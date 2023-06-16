import { Component, OnInit , Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-kategori-dialog',
  templateUrl: './kategori-dialog.component.html',
  styleUrls: ['./kategori-dialog.component.css']
})
export class KategoriDialogComponent implements OnInit {
  dialogBaslik!: string;
  islem!: string;
  frm!: FormGroup;
  yenikayit!: Kategori;
  constructor(
    public matDialog:MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef:MatDialogRef<KategoriDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any

  ) { 
    this.islem = data.islem;
    this.yenikayit = data.kayit;
    if(this.islem == 'ekle'){
      this.dialogBaslik = 'Kategori Ekle';
    }
    if(this.islem == 'duzenle'){
      this.dialogBaslik = 'Kategori Düzenle'
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      KatId: [this.yenikayit.KatId],
      KatAdi: [this.yenikayit.KatAdi]
    });
  }

}
