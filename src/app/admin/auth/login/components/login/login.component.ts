import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;
  token: any;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.loginService
      .login({ email: this.email, password: this.password })
      .subscribe(
        (res: any) => {
          swal.fire('Success', 'Login berhasil', 'success');
          setTimeout(() => {
            swal.close();
          }, 1000);
          this.token = res.data.token;
          localStorage.setItem('token', this.token);
          this.router.navigate(['/admin/home']);
        },
        (err: any) => {
          if (err.error.errors.email && err.error.errors.password) {
            swal.fire({
              icon: 'error',
              html:
                err.error.errors.email[0] +
                '<br>' +
                err.error.errors.password[0],
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
