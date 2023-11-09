import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/components/login/login.component';
import { RegisterComponent } from './auth/register/components/register/register.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/components/menu/menu.component';
import { NavbarComponent } from './navbar/components/navbar/navbar.component';
import { FormmenuComponent } from './menu/components/formmenu/formmenu.component';
// import { NavbarComponent } from './navbar/components/navbar/navbar.component';
// import { DataTablesModule } from 'angular-datatables';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { LayananComponent } from './layanan/components/layanan/layanan.component';
import { FormlayananComponent } from './layanan/components/formlayanan/formlayanan.component';
import { KategoriComponent } from './kategoriMenu/components/kategori/kategori.component';
import { FormKategoriComponent } from './kategoriMenu/components/form-kategori/form-kategori.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileComponent } from './auth/profile/components/profile/profile.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DataTablesModule } from 'angular-datatables';
import { UserComponent } from './user/components/user/user.component';
import { FormuserComponent } from './user/components/formuser/formuser.component';
import { ChartsModule } from 'ng2-charts';
import { RekapComponent } from './rekap/components/rekap/rekap.component';
import { SliderComponent } from './slider/components/slider/slider.component';
import { FormSliderComponent } from './slider/components/form-slider/form-slider.component';
import { TransaksiComponent } from './transaksi/components/transaksi/transaksi.component';
import { ProsedurComponent } from './prosedur/components/prosedur/prosedur.component';
import { FormProsedurComponent } from './prosedur/components/form-prosedur/form-prosedur.component';
import { TentangKamiComponent } from './tentangKami/components/tentang-kami/tentang-kami.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormTentangKamiComponent } from './tentangKami/components/form-tentang-kami/form-tentang-kami.component';
import { PembatalanComponent } from './pembatalan/components/pembatalan/pembatalan.component';
import { RekeningComponent } from './rekening/components/rekening/rekening.component';
import { FormRekeningComponent } from './rekening/components/form-rekening/form-rekening.component';
// import { NgApexchartsModule } from 'ng-apexcharts';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    MenuComponent,
    NavbarComponent,
    FormmenuComponent,
    LayananComponent,
    FormlayananComponent,
    KategoriComponent,
    FormKategoriComponent,
    ProfileComponent,
    UserComponent,
    FormuserComponent,
    RekapComponent,
    SliderComponent,
    FormSliderComponent,
    TransaksiComponent,
    ProsedurComponent,
    FormProsedurComponent,
    TentangKamiComponent,
    FormTentangKamiComponent,
    PembatalanComponent,
    RekeningComponent,
    FormRekeningComponent,

    // NavbarComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    NgSelectModule,
    DataTablesModule,
    ChartsModule,
    MatSlideToggleModule,
    // NgApexchartsModule,
  ],
})
export class AdminModule {}
