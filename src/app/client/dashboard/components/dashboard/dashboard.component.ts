import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { MenuService } from 'src/app/client/menu/services/menu.service';
import { RuanganService } from 'src/app/client/ruangan/services/ruangan.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  listSlider: any;
  listMenu: any;
  listRuangan: any;
  constructor(
    private dashboardService: DashboardService,
    private menuService: MenuService,
    private ruanganService: RuanganService
  ) {}

  ngOnInit(): void {
    this.getSlider();
    this.getMenu();
    this.getRuangan();
  }

  getSlider() {
    this.dashboardService.getSlider().subscribe(
      (res: any) => {
        this.listSlider = res.data.list;
        console.log(this.listSlider);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  getMenu() {
    this.menuService.getMenu().subscribe(
      (res: any) => {
        this.listMenu = res.data.list.slice(0, 4);
        console.log(this.listMenu);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getRuangan() {
    this.ruanganService.getRuangan().subscribe(
      (res: any) => {
        this.listRuangan = res.data.list.slice(0, 1);
        console.log(this.listRuangan);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
