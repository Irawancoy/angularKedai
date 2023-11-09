import { Component, OnInit, ViewChild } from '@angular/core';
import { RuanganService } from '../../services/ruangan.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from 'src/app/client/menu/services/menu.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

interface Item {
  nama: string;
  harga1jam: number;
  harga3jam: number;
}

@Component({
  selector: 'app-ruangan',
  templateUrl: './ruangan.component.html',
  styleUrls: ['./ruangan.component.css'],
})
export class RuanganComponent implements OnInit {
  @ViewChild('keranjangModal') keranjangModal: any;

  listRuangan: any;
  modelId: any;
  items: Item[] = []; // Daftar item dalam keranjang
  showKeranjang: boolean = false; // Status tampilan keranjang
  modal: any;
  token: any;

  constructor(
    private ruanganService: RuanganService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRuangan();
    this.token = localStorage.getItem('ctoken');
  }

  getRuangan() {
    this.ruanganService.getRuangan().subscribe(
      (res: any) => {
        this.listRuangan = res.data.list;
        console.log(this.listRuangan);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  showDetail(ruanganModel, modal) {
    this.modelId = ruanganModel.id;
    this.modalService.open(modal, { size: 'lg' });
  }

  addToCart(item: Item) {
    if (this.token == null) {
      swal
        .fire({
          title: 'Anda harus login terlebih dahulu!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Tidak',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        });
      return;
    }
    this.items.push(item);
    this.showKeranjang = true;
    this.modal = this.modalService.open(this.keranjangModal, { size: 'lg' });
  }
  reload() {
    window.location.reload();
  }
}
