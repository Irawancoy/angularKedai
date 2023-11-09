import { Component, OnInit, ViewChild } from '@angular/core';
import { TentangKamiService } from '../../services/tentang-kami.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tentang-kami',
  templateUrl: './tentang-kami.component.html',
  styleUrls: ['./tentang-kami.component.css'],
})
export class TentangKamiComponent implements OnInit {
  dataTentangKami: any;
  titleCard: any;
  modelId: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(
    private tentangKamiService: TentangKamiService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getTentangKami();
  }

  getTentangKami() {
    this.tentangKamiService.getTentangKami().subscribe((res: any) => {
      this.dataTentangKami = res.data.list;
      console.log(this.dataTentangKami);
    });
  }

  createTentangKami(modal) {
    this.titleCard = 'Tambah Tentang Kami';
    this.modelId = 0;
    this.modalService.open(modal, { size: 'lg' });
  }

  updateTentangKami(tentangKamiModel, modal) {
    this.titleCard = 'Edit Tentang Kami  ';
    this.modelId = tentangKamiModel.id;
    this.modalService.open(modal, {
      size: 'lg',
      backdrop: 'static',
    });
  }

  deleteTentangKami(Id) {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tentangKamiService.deleteTentangKami(Id).subscribe(
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
  reload() {
    this.getTentangKami();
  }
}
