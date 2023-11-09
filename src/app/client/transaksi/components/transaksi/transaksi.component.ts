import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { RuanganService } from 'src/app/client/ruangan/services/ruangan.service';
import { TransaksiService } from '../../services/transaksi.service';
import { MenuService } from 'src/app/client/menu/services/menu.service';
import swal from 'sweetalert2';
import moment from 'moment';
import { get } from 'jquery';
import { ListKeranjangComponent } from 'src/app/client/ruangan/components/list-keranjang/list-keranjang/list-keranjang.component';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.component.html',
  styleUrls: ['./transaksi.component.css'],
})
export class TransaksiComponent implements OnInit {
  @Input() keranjangId: any;
  @Output() afterSave = new EventEmitter<boolean>();
  selectedPrice: number = 0;
  selectedMenu: any = {};
  selectedMenuList: any[] = [];
  selectedMenuSummary: string = '';
  menuTersedia: any;

  ruangan: any;
  dataKeranjang: any;
  formModel: {
    id_customer: number;
    harga_ruang: number;
    tamu: number;
    tanggal_sewa: any;
    jam_mulai: any;
    jam_selesai: any;
    jenis_transaksi: any;
    foto_ktp: any;
    no_hp: number;
    catatan: any;
    total: number;
    bayar: number;
    kurang_bayar: number;
    detail_menu: [
      {
        id_menu: number;
        nama: any;
        harga: number;
        jumlah: number;
      }
    ];
    detail_ruangan: {
      id_ruangan: number;
      nama: any;
    };
  };
  semuaTransaksi: any;
  transaksiSukses: any;
  tanggalSukses: any;
  prosedur: any;
  openMore: boolean = false;

  minDate = moment().add(4, 'days').format('YYYY-MM-DD');
  constructor(
    private ruanganService: RuanganService,
    private transaksiService: TransaksiService,
    private menuService: MenuService
  ) {}
  ngOnInit(): void {
    console.log(this.keranjangId);
    this.getKeranjangById(this.keranjangId);
    this.emptyForm();
    this.getAllTransaksi();
    this.getProsedur();
    this.getMenu();
  }

  openMoreForm() {
    if (this.openMore == false) {
      this.openMore = true;
    } else {
      this.openMore = false;
    }
  }
  getMenu() {
    this.menuService.getMenu().subscribe((res: any) => {
      this.menuTersedia = res.data.list.filter((menu) => menu.status > 0);
      console.log(this.menuTersedia);
    });
  }

  getProsedur() {
    this.ruanganService.getProsedur().subscribe((res: any) => {
      this.prosedur = res.data.list;
      console.log(this.prosedur);
    });
  }
  getRuanganById(id) {
    this.ruanganService
      .getRuanganById(this.formModel.detail_ruangan[0].id_ruangan)
      .subscribe(
        (res: any) => {
          this.ruangan = res.data;
          console.log(this.ruangan);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  updateJamSelesai(): void {
    if (this.formModel.jam_mulai) {
      const timeFormat = 'HH:mm:ss'; // Define the expected format of the time string
      const jamMulai = moment(this.formModel.jam_mulai, timeFormat);

      if (this.selectedPrice === 200000) {
        // Jika harga_ruang = 200000, tambahkan 3 jam
        this.formModel.jam_selesai = jamMulai
          .add(3, 'hours')
          .format(timeFormat);
      } else if (this.selectedPrice === 100000) {
        // Jika harga_ruang = 300000, tambahkan 4 jam
        this.formModel.jam_selesai = jamMulai
          .add(1, 'hours')
          .format(timeFormat);
      }
    }
  }
  addMenuToTable() {
    if (this.selectedMenu) {
      console.log(this.selectedMenu);
      const menuWithQuantity = {
        id_detail_menu: 0,
        id_menu: this.selectedMenu.id,
        nama: this.selectedMenu.nama,
        kategori: this.selectedMenu.kategori,
        harga: this.selectedMenu.harga,
        jumlah: 1,
      };
      this.formModel.detail_menu.push(menuWithQuantity);
      this.selectedMenuSummary = `${menuWithQuantity.nama} - ${menuWithQuantity.harga}`;
      this.selectedMenu = null;
      console.log(this.formModel.detail_menu);
      this.totalKeseluruhan();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.formModel?.currentValue?.jam_mulai ||
      changes.formModel?.currentValue?.harga_ruang
    ) {
      this.updateJamSelesai();
    }
  }

  emptyForm() {
    this.formModel = {
      id_customer: 0,
      harga_ruang: 0,
      tamu: 0,
      tanggal_sewa: '',
      jam_mulai: '',
      jam_selesai: '',
      jenis_transaksi: '',
      foto_ktp: '',
      no_hp: 0,
      catatan: '',
      total: 0,
      bayar: 0,
      kurang_bayar: 0,

      detail_menu: [
        {
          id_menu: 0,
          jumlah: 0,
          nama: '',
          harga: 0,
        },
      ],
      detail_ruangan: {
        id_ruangan: 0,
        nama: '',
      },
    };
  }
  imgSrc: any;

  getKeranjangById(id) {
    this.ruanganService
      .getKeranjangById(this.keranjangId)
      .subscribe((res: any) => {
        this.formModel = res.data;

        console.log(this.formModel);
        this.getRuanganById(this.formModel.detail_ruangan[0].id_ruangan);
      });
  }
  increaseQuantity(index: number) {
    this.formModel.detail_menu[index].jumlah += 1;
    this.totalKeseluruhan();
  }

  decreaseQuantity(index: number) {
    if (this.formModel.detail_menu[index].jumlah > 1) {
      this.formModel.detail_menu[index].jumlah -= 1;
      this.totalKeseluruhan();
    }
  }

  removeMenu(index: number) {
    this.formModel.detail_menu.splice(index, 1);
    this.totalKeseluruhan();
  }
  getAllTransaksi() {
    this.transaksiService.getAllTransaksi().subscribe((res: any) => {
      this.semuaTransaksi = res.data.list;
      this.transaksiSukses = this.semuaTransaksi.filter(
        (transaksi: any) => transaksi.status > 0
      );
      this.tanggalSukses = this.transaksiSukses.map(
        (transaksi) => transaksi.tanggal_sewa
      );

      console.log(this.tanggalSukses);
      console.log(this.transaksiSukses);
      console.log(this.semuaTransaksi);
    });
  }

  jamSelesai() {
    if (this.formModel.harga_ruang === 200000) {
      // Jika harga_ruang = 200000, tambahkan 3 jam pada jam_mulai
      const jamMulai = new Date(this.formModel.jam_mulai);
      jamMulai.setHours(jamMulai.getHours() + 3);
      this.formModel.jam_selesai = jamMulai.toISOString();
      console.log(this.formModel.jam_selesai);
    } else if (this.formModel.harga_ruang === 100000) {
      // Jika harga_ruang = 100000, tambahkan 1 jam pada jam_mulai
      const jamMulai = new Date(this.formModel.jam_mulai);
      jamMulai.setHours(jamMulai.getHours() + 1);
      this.formModel.jam_selesai = jamMulai.toISOString();
      console.log(this.formModel.jam_selesai);
    }
  }

  totalHargaMenu() {
    let total = 0;
    for (let menu of this.formModel.detail_menu) {
      total += menu.harga * menu.jumlah;
    }
    return total;
  }
  totalKeseluruhan() {
    let total = 0;
    total += this.totalHargaMenu();
    total += this.formModel.harga_ruang;
    return total;
  }
  createTransaksi() {
    console.log(this.formModel);
    if (this.formModel.jenis_transaksi === 'DP') {
      if (!this.imgSrc && !this.formModel.foto_ktp) {
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please fill in the photo field.',
        });
        return;
      }
      this.formModel.bayar = this.formModel.total * 0.3;
      this.formModel.kurang_bayar = this.formModel.total * 0.7;
    } else {
      this.formModel.bayar = this.formModel.total;
    }

    if (typeof this.imgSrc !== undefined) {
      this.formModel.foto_ktp = this.imgSrc;
    } else {
      this.imgSrc = '';
    }

    this.transaksiService.postTransaksi(this.formModel).subscribe(
      (res: any) => {
        this.ruanganService.deleteKeranjang(this.keranjangId).subscribe(
          (res: any) => {
            this.afterSave.emit(true);
            window.location.reload();

            console.log(res);
          },
          (err: any) => {
            console.log(err);
          }
        );

        this.afterSave.emit(true);
        console.log(res);
        swal
          .fire('Berhasil!', 'Transaksi berhasil dibuat.', 'success')
          .then(() => {
            this.emptyForm();
            // this.getKeranjangByCustomer(this.userLog.id);
          });
      },
      (err: any) => {
        // console.log(err.error.errors.tanggal_sewa[0]);

        if (err.error.errors.tanggal_sewa) {
          swal.fire({
            icon: 'error',
            html: err.error.errors.tanggal_sewa[0],
          });
        } else if (err.error.errors.jam_mulai) {
          swal.fire({
            icon: 'error',
            html: err.error.errors.jam_mulai[0],
          });
        } else if (err.error.errors.no_hp) {
          swal.fire({
            icon: 'error',
            html: err.error.errors.no_hp[0],
          });
        } else if (err.error.errors.jenis_transaksi) {
          swal.fire({
            icon: 'error',
            html: err.error.errors.jenis_transaksi[0],
          });
        }
      }
    );
  }

  onFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgSrc = reader.result;
    };
  }
}
