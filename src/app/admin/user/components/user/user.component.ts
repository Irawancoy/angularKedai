import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  listUser: any;
  titleCard: any;
  modelId: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    };
  }

  getUser() {
    this.userService.getUser().subscribe(
      (res: any) => {
        this.listUser = res.data.list;
        this.dtTrigger.next(null);
        console.log(this.listUser);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  createUser(modal) {
    this.titleCard = 'Tambah User';
    this.modelId = 0;
    this.modalService.open(modal, { size: 'lg' });
  }
  updateUser(userModel, modal) {
    this.titleCard = 'Edit User ' + userModel.nama;
    this.modelId = userModel.id;
    this.modalService.open(modal, {
      size: 'lg',
      backdrop: 'static',
    });
  }
  deleteUser(Id) {
    swal
      .fire({
        title: 'Apakah anda yakin?',
        text: 'Data yang sudah dihapus tidak bisa dikembalikan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(Id).subscribe(
            (res: any) => {
              console.log(res);
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
