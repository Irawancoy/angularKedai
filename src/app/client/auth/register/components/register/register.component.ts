import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  nama: any;
  email: any;
  password: any;
  no_hp: number;

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register() {
    this.registerService
      .register({
        nama: this.nama,
        email: this.email,
        password: this.password,
        no_hp: this.no_hp,
      })
      .subscribe(
        (res: any) => {
          swal.fire('Success', 'Register berhasil', 'success');
          setTimeout(() => {
            swal.close();
          }, 1000);
          this.router.navigate(['/login']);
        },
        (err: any) => {
          console.log(err);
          if (
            err.error.errors.email &&
            err.error.errors.password &&
            err.error.errors.nama &&
            err.error.errors.no_hp
          ) {
            swal.fire({
              icon: 'error',
              html:
                err.error.errors.email[0] +
                '<br>' +
                err.error.errors.password[0] +
                '<br>' +
                err.error.errors.nama[0] +
                '<br>' +
                err.error.errors.no_hp[0],
            });
          } else if (err.error.errors.email && err.error.errors.password) {
            swal.fire({
              icon: 'error',
              html:
                err.error.errors.email[0] +
                '<br>' +
                err.error.errors.password[0],
            });
          } else if (err.error.errors.email && err.error.errors.nama) {
            swal.fire({
              icon: 'error',
              html:
                err.error.errors.email[0] + '<br>' + err.error.errors.nama[0],
            });
          } else if (err.error.errors.email && err.error.errors.no_hp) {
            swal.fire({
              icon: 'error',
              html:
                err.error.errors.email[0] + '<br>' + err.error.errors.no_hp[0],
            });
          } else if (err.error.errors.password && err.error.errors.nama) {
            swal.fire({
              icon: 'error',
              html:
                err.error.errors.password[0] +
                '<br>' +
                err.error.errors.nama[0],
            });
          } else if (err.error.errors.password && err.error.errors.no_hp) {
            swal.fire({
              icon: 'error',
              html:
                err.error.errors.password[0] +
                '<br>' +
                err.error.errors.no_hp[0],
            });
          } else if (err.error.errors.email) {
            swal.fire({
              icon: 'error',
              html: err.error.errors.email[0],
            });
          } else if (err.error.errors.password) {
            swal.fire({
              icon: 'error',
              html: err.error.errors.password[0],
            });
          } else if (err.error.errors.nama) {
            swal.fire({
              icon: 'error',
              html: err.error.errors.nama[0],
            });
          } else if (err.error.errors.no_hp) {
            swal.fire({
              icon: 'error',
              html: err.error.errors.no_hp[0],
            });
          } else {
            swal.fire({
              icon: 'error',
              html: err.error.errors,
            });
          }
        }
      );
  }
}
