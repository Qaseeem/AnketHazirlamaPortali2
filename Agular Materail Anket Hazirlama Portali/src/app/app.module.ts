import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './Material.Module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { AnketlerComponent } from './components/anketler/anketler.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AnketlerlisteleComponent } from './components/anketlerlistele/anketlerlistele.component';
import { AnketlerDialogComponent } from './components/dialogs/anketler-dialog/anketler-dialog.component';
import { SorularComponent } from './components/sorular/sorular.component';
import { SorularDialogComponent } from './components/dialogs/sorular-dialog/sorular-dialog.component';
import { SorularlisteleComponent } from './components/sorularlistele/sorularlistele.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    KategoriComponent,
    AnketlerComponent,
    AnketlerlisteleComponent,
    SorularComponent,
    SorularlisteleComponent,
    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    AnketlerDialogComponent,
    SorularDialogComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
