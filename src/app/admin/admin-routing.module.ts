import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/components/login/login.component';
import { RegisterComponent } from './auth/register/components/register/register.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guard/auth.guard';
import { MenuComponent } from './menu/components/menu/menu.component';
import { LayananComponent } from './layanan/components/layanan/layanan.component';
import { KategoriComponent } from './kategoriMenu/components/kategori/kategori.component';
import { ProfileComponent } from './auth/profile/components/profile/profile.component';
import { UserComponent } from './user/components/user/user.component';
import { RekapComponent } from './rekap/components/rekap/rekap.component';
import { SliderComponent } from './slider/components/slider/slider.component';
import { TransaksiComponent } from './transaksi/components/transaksi/transaksi.component';
import { ProsedurComponent } from './prosedur/components/prosedur/prosedur.component';
import { TentangKamiComponent } from './tentangKami/components/tentang-kami/tentang-kami.component';
import { PembatalanComponent } from './pembatalan/components/pembatalan/pembatalan.component';
import { RekeningComponent } from './rekening/components/rekening/rekening.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // redirect from /admin to /home
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'layanan', component: LayananComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'user', component: UserComponent },
      { path: 'rekap', component: RekapComponent },
      { path: 'slider', component: SliderComponent },
      { path: 'transaksi', component: TransaksiComponent },
      { path: 'prosedur', component: ProsedurComponent },
      { path: 'tentang-kami', component: TentangKamiComponent },
      { path: 'pembatalan', component: PembatalanComponent },
      { path: 'rekening', component: RekeningComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
