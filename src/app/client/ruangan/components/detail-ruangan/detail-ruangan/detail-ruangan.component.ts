import { Component, OnInit, Input } from '@angular/core';
import { RuanganService } from '../../../services/ruangan.service';
@Component({
  selector: 'app-detail-ruangan',
  templateUrl: './detail-ruangan.component.html',
  styleUrls: ['./detail-ruangan.component.css'],
})
export class DetailRuanganComponent implements OnInit {
  @Input() ruanganId: any;
  ruangan: any;
  prosedur: any;
  constructor(private ruanganService: RuanganService) {}

  ngOnInit(): void {
    this.getRuanganById(this.ruanganId);
    this.getProsedur();
  }

  getRuanganById(id) {
    this.ruanganService.getRuanganById(id).subscribe(
      (res: any) => {
        this.ruangan = res.data;
        console.log(this.ruangan);
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
}
