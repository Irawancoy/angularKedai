import { Component, OnInit } from '@angular/core';
import { RekapService } from '../../services/rekap.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment';

@Component({
  selector: 'app-rekap',
  templateUrl: './rekap.component.html',
  styleUrls: ['./rekap.component.css'],
})
export class RekapComponent implements OnInit {
  data: any;
  constructor(private rekapService: RekapService) {}

  ngOnInit(): void {
    this.getRekap();
  }
  getRekap() {
    this.rekapService.getRekapAll().subscribe((res: any) => {
      // console.log(res);
      this.data = res.data.list.filter(
        (item: any) => item.status_pelunasan > 0
      );
      console.log(this.data);
    });
  }
  rekapFileName() {
    const date = moment().format('YYYY-MM-DD');
    return `Rekap-${date}`;
  }
  exportAsPDF() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then((canvas) => {
      const imgWidth = 210; // A4 size width
      const pageHeight = 295; // A4 size height
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(this.rekapFileName()); // Generated PDF
    });
  }
}
