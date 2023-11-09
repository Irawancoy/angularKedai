import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ClientAuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('ctoken');
    console.log(token);

    if (!token) {
      Swal.fire({
        title: 'Anda harus login terlebih dahulu!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Tidak',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
      return new Observable<boolean>((observer) => observer.next(false));
    }

    const isTokenExpired = this.jwtHelper.isTokenExpired(token);

    if (isTokenExpired) {
      this.router.navigate(['/login']);
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
