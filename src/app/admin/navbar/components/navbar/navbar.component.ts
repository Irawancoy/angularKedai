import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import swal from 'sweetalert2';

import { ProfileService } from 'src/app/admin/auth/profile/services/profile.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  token: any;
  userData: any;
  email: any;
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.getMe();
    // this.token = localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
    swal.fire({
      icon: 'success',
      title: 'Logout Berhasil',
      text: 'Terima Kasih',
    });
    window.location.reload();
  }
  getMe() {
    this.profileService.getProfile().subscribe((res) => {
      this.userData = res;
      this.email = this.userData.data.email;
      // console.log(this.email);
    });
  }
}
