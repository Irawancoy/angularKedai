import { Component, OnInit } from '@angular/core';
import { TentangKamiService } from '../../services/tentang-kami.service';
@Component({
  selector: 'app-tentang-kami',
  templateUrl: './tentang-kami.component.html',
  styleUrls: ['./tentang-kami.component.css'],
})
export class TentangKamiComponent implements OnInit {
  dataTentangKami: any;

  constructor(private tentangKamiService: TentangKamiService) {}

  ngOnInit(): void {
    this.getTentangKami();
  }

  getTentangKami() {
    this.tentangKamiService.getTentangKami().subscribe((res: any) => {
      this.dataTentangKami = res.data.list[0];
      console.log(this.dataTentangKami);
    });
  }
}
