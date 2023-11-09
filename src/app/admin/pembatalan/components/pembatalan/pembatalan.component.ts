import { Component, OnInit, ViewChild } from '@angular/core';
import { PembatalanService } from '../../services/pembatalan.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-pembatalan',
  templateUrl: './pembatalan.component.html',
  styleUrls: ['./pembatalan.component.css'],
})
export class PembatalanComponent implements OnInit {
  dataPembatalan: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(private pembatalanService: PembatalanService) {}

  ngOnInit(): void {
    this.getPembatalan();
  }

  getPembatalan() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25, 50, 100],
      processing: true,
    };
    this.pembatalanService.getPembatalan().subscribe(
      (res: any) => {
        this.dataPembatalan = res.data.list;
        console.log(this.dataPembatalan);
        this.dtTrigger.next();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deletePembatalan(Id) {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pembatalanService.deletePembatalan(Id).subscribe(
          (res: any) => {
            Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
            this.reload();
          },
          (err: any) => {
            console.log(err);
            Swal.fire('Gagal!', 'Data gagal dihapus.', 'error');
          }
        );
      }
    });
  }
  reload() {
    window.location.reload();
  }
  editPembatalanStatus(id, newStatus) {
    const data = {
      id: id,
      status: newStatus,
    };
    this.pembatalanService.putPembatalan(data).subscribe(
      (res: any) => {
        Swal.fire('Berhasil!', 'Status berhasil diubah.', 'success');
        this.reload();
      },
      (err) => {
        Swal.fire('Gagal!', 'Status gagal diubah.', 'error');
      }
    );
  }
}
