import { Component, OnInit, ViewChild } from '@angular/core';
import { ProsedurService } from '../../services/prosedur.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-prosedur',
  templateUrl: './prosedur.component.html',
  styleUrls: ['./prosedur.component.css'],
})
export class ProsedurComponent implements OnInit {
  listProsedur: any;
  titleCard: any;
  modelId: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(
    private prosedurService: ProsedurService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getProsedur();
  }

  getProsedur() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25, 50, 100],
      processing: true,
      searching: true,
    };
    this.prosedurService.getProsedur().subscribe((res: any) => {
      this.listProsedur = res.data.list;
      this.dtTrigger.next(null);
    });
  }
  createProsedur(modal) {
    this.titleCard = 'Tambah Prosedur';
    this.modelId = 0;
    this.modalService.open(modal, { size: 'lg' });
  }
  updateProsedur(prosedurModel, modal) {
    this.titleCard = 'Edit Prosedur  ' + prosedurModel.nomer;
    this.modelId = prosedurModel.id;
    this.modalService.open(modal, {
      size: 'lg',
      backdrop: 'static',
    });
  }

  deleteProsedur(Id) {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.prosedurService.deleteProsedur(Id).subscribe(
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
