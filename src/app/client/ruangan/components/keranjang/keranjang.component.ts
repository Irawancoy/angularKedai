import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { MenuService } from 'src/app/client/menu/services/menu.service';
import swal from 'sweetalert2';
import { ProfileService } from 'src/app/client/auth/profile/services/profile.service';
import { RuanganService } from '../../services/ruangan.service';
import moment from 'moment';
import { TransaksiService } from 'src/app/client/transaksi/services/transaksi.service';
@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.component.html',
  styleUrls: ['./keranjang.component.css'],
})
export class KeranjangComponent implements OnInit {
  @Input() listRuangan: any;
  @Input() keranjangId: any;
  @Output() afterSave = new EventEmitter<boolean>();
  selectedPrice: number = 0;
  listMenu: any[] = [];
  menuTersedia: any;
  selectedGuests: number = 10;
  userLog: any;
  ruangan: any;
  keranjangCust: any;
  prosedur: any;

  selectedMenu: any = {};
  selectedMenuList: any[] = [];
  selectedMenuSummary: string = '';

  tanggalSewa = moment().add(4, 'days').format('YYYY-MM-DD');
  jamMulai: any;
  jamSelesai: any;
  noHp: any;
  jenisTransaksi: any;
  fotoKTP: any;
  bayar: any;
  kurangBayar: any;
  catatan: any;
  imgSrc: any;
  formPesan: boolean = false;
  tglTransaksiSukses: any;
  selectedDates: any;
  dataSemua: any;
  notifDate: boolean = false;
  minDate = moment().add(4, 'days').format('YYYY-MM-DD');
  panelOpenState: boolean = false;
  token: any;
  constructor(
    private menuService: MenuService,
    private profileService: ProfileService,
    private ruanganService: RuanganService,
    private transaksiService: TransaksiService
  ) {}

  ngOnInit(): void {
    this.getMenu();
    this.getProfile();
    this.ruang();
    this.getProsedur();
    this.getAllTransaksi();
  }

  highlightSelectedDates(selectedDate: string) {
    const dateInputs =
      document.querySelectorAll<HTMLInputElement>('#tanggalsewa');

    dateInputs.forEach((input) => {
      const dateValue = input.value;
      if (this.tglTransaksiSukses.includes(dateValue)) {
        input.classList.add('selected-date');
        this.notifDate = true;
      } else {
        input.classList.remove('selected-date');
        this.notifDate = false;
      }
    });
  }

  getAllTransaksi() {
    this.transaksiService.getAllTransaksi().subscribe(
      (res: any) => {
        const data = res.data.list;
        const tgl = data.map((tgl: any) => tgl.tanggal_sewa);
        this.tglTransaksiSukses = tgl;
        console.log(this.tglTransaksiSukses);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getProsedur() {
    this.ruanganService.getProsedur().subscribe(
      (res: any) => {
        this.prosedur = res.data.list;
        console.log(this.prosedur);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  updateJamSelesai(): void {
    if (this.jamMulai) {
      const timeFormat = 'HH:mm'; // Define the expected format of the time string
      const jamMulai = moment(this.jamMulai, timeFormat);

      if (this.selectedPrice === 200000) {
        // Jika harga_ruang = 200000, tambahkan 3 jam
        this.jamSelesai = jamMulai.add(3, 'hours').format(timeFormat);
      } else if (this.selectedPrice === 100000) {
        // Jika harga_ruang = 300000, tambahkan 4 jam
        this.jamSelesai = jamMulai.add(1, 'hours').format(timeFormat);
      }
    }
  }
  fPesan() {
    this.formPesan = true;
  }

  onFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgSrc = reader.result;
    };
  }
  ruang() {
    this.ruangan = this.listRuangan[0];
    console.log(this.ruangan);
  }

  getProfile() {
    this.profileService.getProfile().subscribe(
      (res: any) => {
        this.userLog = res.data;
        console.log(this.userLog);
        this.getKeranjangByCustomer(this.userLog.id);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getMenu() {
    this.menuService.getMenu().subscribe(
      (res: any) => {
        this.listMenu = res.data.list;
        this.menuTersedia = res.data.list.filter(
          (menu: any) => menu.status > 0
        );
        // console.log(this.menuTersedia);
        // console.log(this.listMenu);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getKeranjangByCustomer(id) {
    this.ruanganService.getKeranjangByCustomer(this.userLog.id).subscribe(
      (res: any) => {
        this.keranjangCust = res.data.list;
        console.log(this.keranjangCust);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  addMenuToTable() {
    if (this.selectedMenu) {
      const menuWithQuantity = { ...this.selectedMenu, jumlah: 1 }; // Add the quantity property
      this.selectedMenuList.push(menuWithQuantity);
      this.selectedMenuSummary = `${menuWithQuantity.nama} - ${menuWithQuantity.harga}`;
      this.selectedMenu = null;
      console.log(this.selectedMenuList);
      this.calculateTotalPrice();
    }
  }
  increaseQuantity(index: number) {
    this.selectedMenuList[index].jumlah += 1;
    this.calculateTotalPrice();
  }

  decreaseQuantity(index: number) {
    if (this.selectedMenuList[index].jumlah > 1) {
      this.selectedMenuList[index].jumlah -= 1;
      this.calculateTotalPrice();
    }
  }

  removeMenu(index: number) {
    this.selectedMenuList.splice(index, 1);
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const menu of this.selectedMenuList) {
      totalPrice += menu.harga * menu.jumlah;
    }
    return totalPrice;
  }

  deleteMenu(menu: any) {
    const index = this.selectedMenuList.indexOf(menu);
    if (index !== -1) {
      this.selectedMenuList.splice(index, 1);
      this.calculateTotalPrice();
    }
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  calculateTotal() {
    let total = 0;
    for (let i = 0; i < this.selectedMenuList.length; i++) {
      total += this.selectedMenuList[i].harga * this.selectedMenuList[i].jumlah;
    }
    total += this.selectedPrice;
    return total;
  }

  simpanKeranjang() {
    this.dataSemua = {
      // id_keranjang: 0,
      id_customer: this.userLog.id,
      tanggal_sewa: this.tanggalSewa,
      jam_mulai: this.jamMulai,
      jam_selesai: this.jamSelesai,
      tamu: this.selectedGuests,
      harga_ruang: this.selectedPrice,
      total: this.calculateTotal(),
      detail_menu: this.selectedMenuList.map((menu) => ({
        id_menu: menu.id,
        jumlah: menu.jumlah,
      })),
      detail_ruangan: [
        {
          id_ruangan: this.ruangan.id,
        },
      ],
    };
    if (this.selectedGuests < 10) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Jumlah tamu minimal 10 orang!',
      });
    } else if (this.selectedGuests > 40) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Jumlah tamu maksimal 40 orang!',
      });
    } else if (this.notifDate == true) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tanggal sewa tidak tersedia,silahkan pilih tanggal lain!',
      });
    } else {
      this.ruanganService.postKeranjang(this.dataSemua).subscribe(
        (res: any) => {
          console.log(res);
          this.afterSave.emit(true);
          swal.fire({
            title: 'Berhasil!',
            text: 'Keranjang berhasil ditambahkan',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        },
        (err: any) => {
          console.log(err);
          swal.fire({
            title: 'Gagal!',
            text: 'Keranjang gagal ditambahkan',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      );
    }
  }

  pesan() {
    this.dataSemua = {
      // id_keranjang: 0,
      id_customer: this.userLog.id,
      tanggal_sewa: this.tanggalSewa,
      jam_mulai: this.jamMulai,
      jam_selesai: this.jamSelesai,
      tamu: this.selectedGuests,
      harga_ruang: this.selectedPrice,
      jenis_transaksi: this.jenisTransaksi,

      no_hp: this.noHp,
      catatan: this.catatan,
      total: this.calculateTotal(),
      detail_menu: this.selectedMenuList.map((menu) => ({
        id_menu: menu.id,
        jumlah: menu.jumlah,
      })),
      detail_ruangan: [
        {
          id_ruangan: this.ruangan.id,
        },
      ],
    };
    if (this.notifDate == true) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tanggal sewa tidak tersedia,silahkan pilih tanggal lain!',
      });
      return;
    }

    if (this.selectedGuests < 10) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Jumlah tamu minimal 10 orang!',
      });
      return; // Return early if the condition is not met
    }

    if (this.jenisTransaksi === 'DP') {
      if (!this.imgSrc && !this.fotoKTP) {
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please fill in the photo field.',
        });
        return;
      }
      this.bayar = this.calculateTotal() * 0.3;
      this.dataSemua.bayar = this.bayar;
      this.kurangBayar = this.calculateTotal() - this.bayar;
      this.dataSemua.kurang_bayar = this.kurangBayar;
    } else {
      this.bayar = this.calculateTotal();
      this.dataSemua.bayar = this.bayar;
    }
    if (typeof this.imgSrc !== undefined) {
      this.fotoKTP = this.imgSrc;
      this.dataSemua.foto_ktp = this.fotoKTP;
    } else {
      this.imgSrc = '';
    }

    this.transaksiService.postTransaksi(this.dataSemua).subscribe(
      (res: any) => {
        console.log(res);
        this.afterSave.emit(true);
        if (this.dataSemua.jenis_transaksi === 'DP') {
          swal.fire({
            title: 'Pemesanan Berhasil!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        } else {
          swal.fire({
            title: 'Pemesanan Berhasil!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        }
      },
      (err: any) => {
        console.log(err);

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
}
