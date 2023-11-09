import { ListKeranjangComponent } from './../../../../client/ruangan/components/list-keranjang/list-keranjang/list-keranjang.component';
import { Component, OnInit } from '@angular/core';
import { RekeningService } from '../../services/rekening.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-rekening',
  templateUrl: './rekening.component.html',
  styleUrls: ['./rekening.component.css'],
})
export class RekeningComponent implements OnInit {
  listRekening: any;
  titleCard: string;
  modelId: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private rekeningService: RekeningService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getRekening();
  }

  getRekening() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25, 50, 100],
      processing: true,
      searching: true,
    };
    this.rekeningService.getRekening().subscribe(
      (res: any) => {
        this.listRekening = res.data.list;
        console.log(this.listRekening);
        this.dtTrigger.next(null);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  createRekening(modal) {
    this.titleCard = 'Tambah Rekening';
    this.modelId = 0;
    this.modalService.open(modal, { size: 'lg' });
  }

  updateRekening(rekeningModel, modal) {
    this.titleCard = 'Edit rekening ' + rekeningModel.nama_pemilik;
    this.modelId = rekeningModel.id;
    this.modalService.open(modal, {
      size: 'lg',
      backdrop: 'static',
    });
  }
  deleteRekening(Id) {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rekeningService.deleteRekening(Id).subscribe(
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
}
