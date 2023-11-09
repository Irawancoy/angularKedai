import { Component, OnInit, ViewChild } from '@angular/core';
import { TransaksiService } from '../../services/transaksi.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.component.html',
  styleUrls: ['./transaksi.component.css'],
})
export class TransaksiComponent implements OnInit {
  dataTransaksi: any;
  tglPembayaranSukses: any;
  tglPelunasanSukses: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  constructor(private transaksiService: TransaksiService) {}

  ngOnInit(): void {
    this.getTransaksi();
  }

  getTransaksi() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25, 50, 100],
      processing: true,
      searching: true,
    };
    this.transaksiService.getTransaksi().subscribe((res: any) => {
      this.dataTransaksi = res.data.list.filter(
        (tran: any) => tran.status_pelunasan === 0
      );
      console.log(this.dataTransaksi);
      const data = res.data.list.filter((tran: any) => tran.status > 0);
      const tgl = data.map((tgl: any) => tgl.tanggal_sewa);
      this.tglPembayaranSukses = tgl;
      console.log(this.tglPembayaranSukses);
      const data2 = res.data.list.filter(
        (tran: any) => tran.status_pelunasan > 0
      );
      const tgl2 = data2.map((tgl2: any) => tgl2.tanggal_sewa);
      this.tglPelunasanSukses = tgl2;
      console.log(this.tglPelunasanSukses);
      this.dtTrigger.next(null);
    });
  }

  deleteTransaksi(Id) {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.transaksiService.deleteTransaksi(Id).subscribe(
          (res: any) => {
            Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
            this.reload();
          },
          (err: any) => {
            Swal.fire('Gagal!', 'Data gagal dihapus.', 'error');
          }
        );
      }
    });
  }
  reload(): void {
    window.location.reload();
  }
  editTransaksiStatus(Id: number, newStatus: number, tanggalSewa: any) {
    const transaksiData = {
      id_transaksi: Id,
      status: newStatus,
      tanggal_sewa: tanggalSewa,
    };

    if (
      newStatus === 1 &&
      this.tglPembayaranSukses.includes(transaksiData.tanggal_sewa)
    ) {
      Swal.fire({
        icon: 'warning',
        title: `Sudah ada pembayaran yang sukses pada tanggal ${transaksiData.tanggal_sewa}`,
        text: 'Hapus transaksi ini?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Batal', // Teks tombol pembatalan
      }).then((result) => {
        if (result.isConfirmed) {
          this.transaksiService
            .deleteTransaksi(transaksiData.id_transaksi)
            .subscribe((res: any) => {
              Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
              this.reload();
            });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Apakah anda yakin?',
        text: 'Ubah Status Pembayaran Customer ?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Batal', // Teks tombol pembatalan
      }).then((result) => {
        if (result.isConfirmed) {
          this.transaksiService.putTransaksi(transaksiData).subscribe(
            (res: any) => {
              Swal.fire(
                'Berhasil!',
                'Status Pembayaran Customer berhasil dikonfirmasi.',
                'success'
              );
              this.reload();
            },
            (err: any) => {
              Swal.fire(
                'Gagal!',
                'Status Pembayaran Customer gagal dikonfirmasi.',
                'error'
              );
            }
          );
        }
      });
    }
  }

  editTransaksiStatusPelunasan(
    Id: number,
    newStatus: number,
    tanggalSewa: any,
    status: number
  ) {
    const transaksiData = {
      id_transaksi: Id,
      status_pelunasan: newStatus,
      tanggal_sewa: tanggalSewa,
      status: status,
    };
    if (status == 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Customer belum melakukan pembayaran',
      });
      return;
    }

    if (
      newStatus === 1 &&
      this.tglPelunasanSukses.includes(transaksiData.tanggal_sewa)
    ) {
      Swal.fire({
        icon: 'warning',
        title: `Sudah ada Pelunasan yang sukses pada tanggal ${transaksiData.tanggal_sewa}`,
        text: 'Hapus transaksi ini?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Batal', // Teks tombol pembatalan
      }).then((result) => {
        if (result.isConfirmed) {
          this.transaksiService
            .deleteTransaksi(transaksiData.id_transaksi)
            .subscribe((res: any) => {
              Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
              this.reload();
            });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Apakah anda yakin?',
        text: 'Ubah Status Pelunasan Customer ?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Batal', // Teks tombol pembatalan
      }).then((result) => {
        if (result.isConfirmed) {
          this.transaksiService.putTransaksi(transaksiData).subscribe(
            (res: any) => {
              Swal.fire(
                'Berhasil!',
                'Status Pelunasan Customer berhasil dikonfirmasi.',
                'success'
              );
              this.reload();
            },
            (err: any) => {
              Swal.fire(
                'Gagal!',
                'Status Pelunasan Customer gagal dikonfirmasi.',
                'error'
              );
            }
          );
        }
      });
    }
  }
  downloadKTP(ktp) {
    const url = ktp; // URL dari file yang akan diunduh
    const fileName = 'ktp.jpg'; // Nama file yang akan diunduh
    saveAs(url, fileName);
  }
}
