import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LayananService } from '../../services/layanan.service';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-layanan',
  templateUrl: './layanan.component.html',
  styleUrls: ['./layanan.component.css'],
})
export class LayananComponent implements OnInit {
  listLayanan: any;
  titleCard: string;
  modelId: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private layananService: LayananService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: true,
      lengthMenu: [5, 10, 25, 50, 100],
    };
    this.getLayanan();
  }

  getLayanan() {
    this.layananService.getLayanan().subscribe(
      (res: any) => {
        this.listLayanan = res.data.list;
        this.dtTrigger.next(null);
        console.log(this.listLayanan);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  createLayanan(modal) {
    this.titleCard = 'Tambah Ruangan';
    this.modelId = 0;
    this.modalService.open(modal, { size: 'lg' });
  }

  updateLayanan(layananModel, modal) {
    this.titleCard = 'Edit Ruangan ' + layananModel.nama;
    this.modelId = layananModel.id;
    this.modalService.open(modal, {
      size: 'lg',
      backdrop: 'static',
    });
  }
  deleteLayanan(Id) {
    swal
      .fire({
        title: 'Apakah anda yakin?',
        text: 'Data yang dihapus tidak dapat dikembalikan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.layananService.deleteLayanan(Id).subscribe(
            (res: any) => {
              swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
              this.reload();
            },
            (err: any) => {
              console.log(err);
              swal.fire('Gagal!', 'Data gagal dihapus.', 'error');
            }
          );
        }
      });
  }
  reload() {
    window.location.reload();
  }
}
