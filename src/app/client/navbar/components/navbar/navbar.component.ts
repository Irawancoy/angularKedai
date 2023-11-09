import { Component, OnInit, Input } from '@angular/core';
import swal from 'sweetalert2';
import { ProfileService } from 'src/app/client/auth/profile/services/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RuanganService } from 'src/app/client/ruangan/services/ruangan.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    private modalService: NgbModal,
    private ruanganService: RuanganService
  ) {}
  jumlah: any;
  custData: any;
  cust: any;
  email: any;
  token: any;
  token2: any;
  titleCard: any;
  modelId: any;
  keranjangCust: any;
  angka: any;

  ngOnInit(): void {
    this.token = localStorage.getItem('ctoken');
    console.log(this.token);
    this.getMe();
  }

  logout() {
    localStorage.removeItem('ctoken');
    swal.fire({
      icon: 'success',
      title: 'Logout Berhasil',
      text: 'Terima Kasih',
    });
    window.location.reload();
  }
  getKeranjangByCustomer(id) {
    this.ruanganService.getKeranjangByCustomer(this.cust.id).subscribe(
      (res: any) => {
        this.keranjangCust = res.data.list;
        this.jumlah = this.keranjangCust.length;
        console.log(this.jumlah);
        console.log(this.keranjangCust[0]);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getMe() {
    this.profileService.getProfile().subscribe((res: any) => {
      this.custData = res.data;
      console.log(this.custData);
      this.email = this.custData.email;
    });
  }

  settingProfile(profileModel, modal) {
    this.titleCard = 'Edit Profile';
    this.modelId = profileModel.id;
    this.modalService.open(modal, {
      size: 'sm',
      backdrop: 'static',
    });
  }

  createKeranjang(modal) {
    this.titleCard = 'Create Keranjang';
    this.modelId = 0;
    this.modalService.open(modal, { size: 'lg' });
  }
  // refresh() {
  //   this.token;
  //   console.log(this.token);
  //   this.getProfile();
  // }
}
