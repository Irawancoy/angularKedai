import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  listMenu: any;
  titleCard: string;
  modelId: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  constructor(
    private menuService: MenuService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25, 50, 100],
      processing: true,
      searching: true,
    };
    this.menuService.getMenu().subscribe((res: any) => {
      this.listMenu = res.data.list;
      this.dtTrigger.next(null);
    });
  }

  createMenu(modal) {
    this.titleCard = 'Tambah Menu';
    this.modelId = 0;
    this.modalService.open(modal, { size: 'lg' });
  }

  updateMenu(menuModel, modal) {
    this.titleCard = 'Edit Menu ' + menuModel.nama;
    this.modelId = menuModel.id;
    this.modalService.open(modal, {
      size: 'lg',
      backdrop: 'static',
    });
  }
  deleteMenu(Id) {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.menuService.deleteMenu(Id).subscribe(
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
