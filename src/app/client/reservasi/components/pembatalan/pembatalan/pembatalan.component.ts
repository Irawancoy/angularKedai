import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TransaksiService } from 'src/app/client/transaksi/services/transaksi.service';
import { ReservasiService } from '../../../services/reservasi.service';
import Swal from 'sweetalert2';
import { ProfileService } from 'src/app/client/auth/profile/services/profile.service';
@Component({
  selector: 'app-pembatalan',
  templateUrl: './pembatalan.component.html',
  styleUrls: ['./pembatalan.component.css'],
})
export class PembatalanComponent implements OnInit {
  @Input() transaksiId: any;
  @Output() afterSave = new EventEmitter<boolean>();
  userId: any;
  formModel: {
    id_transaksi: number;
    keterangan: any;
  };

  constructor(
    private reservasiService: ReservasiService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.emptyForm();
    this.getCustomer();
    console.log(this.transaksiId);
  }

  emptyForm() {
    this.formModel = {
      id_transaksi: 0,
      keterangan: '',
    };
  }

  getCustomer() {
    this.profileService.getProfile().subscribe(
      (res: any) => {
        this.userId = res.data.id;

        console.log(this.userId);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  postPembatalan() {
    this.formModel.id_transaksi = this.transaksiId;
    this.reservasiService.postPembatalan(this.formModel).subscribe(
      (res: any) => {
        this.afterSave.emit(true);
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: res.message,
        });
        this.emptyForm();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
