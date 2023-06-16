import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { AnketlerComponent } from './components/anketler/anketler.component';
import { AnketlerlisteleComponent } from './components/anketlerlistele/anketlerlistele.component';
import { SorularComponent } from './components/sorular/sorular.component';
import { SorularlisteleComponent } from './components/sorularlistele/sorularlistele.component';


const routes: Routes = [
  {
    path:'anasayfa',
    component:HomeComponent
  },
  {
    path:'kategori',
    component:KategoriComponent
  },
  {
    path:'anketler',
    component:AnketlerComponent
  },
  {
    path:'anketlerlistele/:KatId',
    component: AnketlerlisteleComponent
  },
  {
    path:'sorular',
    component: SorularComponent
  },
  {
    path:'sorularlistele/:AnkId',
    component: SorularlisteleComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
