import { Component, OnInit } from '@angular/core';
import { RuanganService } from '../../../services/ruangan.service';
import { ProfileService } from 'src/app/client/auth/profile/services/profile.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-keranjang',
  templateUrl: './list-keranjang.component.html',
  styleUrls: ['./list-keranjang.component.css'],
})
export class ListKeranjangComponent implements OnInit {
  userLog: any;
  modalData: any;
  // userLogId: any;
  listKeranjang: any;
  modal: any;
  modalRef: NgbModalRef | undefined;
  modelId: any;
  titleCard: any;
  panelOpenState: boolean = false;

  constructor(
    private ruanganService: RuanganService,
    private profileService: ProfileService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    this.profileService.getProfile().subscribe(
      (res: any) => {
        this.userLog = res.data;
        // this.userLogId = res.data.id;

        console.log(this.userLog);
        this.getKeranjangByCustomer(this.userLog.id);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getKeranjangByCustomer(id) {
    this.ruanganService.getKeranjangByCustomer(this.userLog.id).subscribe(
      (res: any) => {
        this.listKeranjang = res.data.list;
        console.log(this.listKeranjang);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  openDetailRuangan(content: any, listKeranjang: any): void {
    this.modalData = listKeranjang;
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-title',
    });
  }

  openDetailMenu(content: any, listKeranjang: any): void {
    this.modalData = listKeranjang;
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-title',
    });
  }
  calculateTotal(): number {
    let total = 0;
    for (let menu of this.modalData.detail_menu) {
      total += menu.harga * menu.jumlah;
    }
    return total;
  }

  openDetailHarga(content: any, listKeranjang: any): void {
    this.modalData = listKeranjang;
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-title',
    });
  }

  deleteKeranjang(id) {
    swal
      .fire({
        title: 'Apakah anda yakin?',
        text: 'Anda tidak dapat mengembalikan ini!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Tidak, batalkan!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.ruanganService.deleteKeranjang(id).subscribe(
            (res: any) => {
              console.log(res);
              swal
                .fire('Terhapus!', 'Keranjang berhasil dihapus.', 'success')
                .then(() => {
                  this.getKeranjangByCustomer(this.userLog.id);
                });
            },
            (err: any) => {
              console.log(err);
            }
          );
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swal.fire('Dibatalkan', 'Keranjang batal dihapus', 'error');
        }
      });
  }

  // updateKeranjang(menuModel, modal) {
  //   this.titleCard = 'Edit Keranjang';
  //   this.modelId = menuModel.id_keranjang;
  //   this.modalService.open(modal, {
  //     size: 'lg',
  //     backdrop: 'static',
  //   });
  // }
  createTransaksi(keranjangModel, modal) {
    // this.titleCard = 'Edit Menu ' + keranjangModel.nama;
    this.modelId = keranjangModel.id_keranjang;
    this.modalService.open(modal, {
      size: 'lg',
      backdrop: 'static',
    });
  }
}
