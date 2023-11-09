import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('token');
    console.log(token);

    if (!token) {
      this.router.navigate(['/admin/login']);
      return new Observable<boolean>((observer) => observer.next(false));
    }

    const isTokenExpired = this.jwtHelper.isTokenExpired(token);

    if (isTokenExpired) {
      this.router.navigate(['/admin/login']);
      // alert('Token Anda sudah kadaluarsa, silahkan login ulang');
      Swal.fire({
        title: 'Token Anda sudah kadaluarsa, silahkan login ulang',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return new Observable<boolean>((observer) => observer.next(false));
    }

    return new Observable<boolean>((observer) => observer.next(true));
  }
}
