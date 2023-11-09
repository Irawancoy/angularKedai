import { Component, OnInit } from '@angular/core';
import { TransaksiService } from 'src/app/client/transaksi/services/transaksi.service';
import { ProfileService } from 'src/app/client/auth/profile/services/profile.service';
import { ReservasiService } from '../../services/reservasi.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import swal from 'sweetalert2';
import moment from 'moment';

@Component({
  selector: 'app-reservasi',
  templateUrl: './reservasi.component.html',
  styleUrls: ['./reservasi.component.css'],
})
export class ReservasiComponent implements OnInit {
  modelId: any;
  userLogId: any;
  transaksiCustomer: any;
  titleCard: any;
  transaksiId: any;
  panelOpenState = false;
  invoice: boolean = false;
  rekening: any;

  constructor(
    private transaksiService: TransaksiService,
    private profileService: ProfileService,
    private reservasiService: ReservasiService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getUserLog();
    this.getRekening();
  }

  getUserLog() {
    this.profileService.getProfile().subscribe(
      (res: any) => {
        this.userLogId = res.data.id;
        this.getTransaksiByCustomer(this.userLogId);

        console.log(this.userLogId);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getRekening() {
    this.reservasiService.getRekening().subscribe(
      (res: any) => {
        this.rekening = res.data.list;
        console.log(this.rekening);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTransaksiByCustomer(id) {
    this.reservasiService.getTransaksiByCustomer(this.userLogId).subscribe(
      (res: any) => {
        this.transaksiCustomer = res.data.list;
        console.log(this.transaksiCustomer);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  generateNamaInvoive() {
    // use moment
    const date = moment().format('DD-MM-YYYY');
    const time = moment().format('HH-mm-ss');
    const nama = 'Invoice-' + date + '-' + time + '.pdf';
    return nama;
  }

  createPembatalan(transaksiModel, modal) {
    console.log(transaksiModel);
    // lakukan pembatalan maksimal h -2
    if (
      moment().add(2, 'days').format('YYYY-MM-DD') > transaksiModel.tanggal_sewa
    ) {
      swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Pembatalan hanya bisa dilakukan maksimal 2 hari sebelum tanggal sewa',
      });
      return;
    }

    this.titleCard = 'Ajukan Pembatalan';
    this.modelId = 0;
    this.transaksiId = transaksiModel.id_transaksi;
    // console.log(this.transaksiId);
    this.modalService.open(modal, { size: 'sm' });
  }
  expandInvoice() {
    if (this.invoice == true) {
      this.invoice = false;
    } else {
      this.invoice = true;
    }
  }

  exportAsPDF(id) {
    const data = document.getElementById(id);
    html2canvas(data).then((canvas) => {
      const imgWidth = 210; // A4 size width
      const pageHeight = 295; // A4 size height
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, pageHeight);
      pdf.save(this.generateNamaInvoive()); // Generated PDF
    });
  }
}
