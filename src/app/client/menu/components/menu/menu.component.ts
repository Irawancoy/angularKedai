import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  filteredMenu: any;

  listMenu: any;
  selectedCategory = 'Semua';
  menuMakanan: any;
  menuMinuman: any;
  menuSnack: any;
  modelId: any;

  constructor(
    private menuService: MenuService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getMenuMakanan();
    this.getMenuMinuman();

    this.getMenuall();
  }

  getMenuall() {
    this.menuService.getMenu().subscribe(
      (res: any) => {
        this.listMenu = res.data.list;
        console.log(this.listMenu);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  getMenuMakanan() {
    this.menuService.getMenu().subscribe(
      (res: any) => {
        this.menuMakanan = res.data.list.filter(
          (menu: any) => menu.kategori === 'makanan'
        );
        console.log(this.menuMakanan);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  getMenuMinuman() {
    this.menuService.getMenu().subscribe(
      (res: any) => {
        this.menuMinuman = res.data.list.filter(
          (menu: any) => menu.kategori === 'minuman'
        );
        console.log(this.menuMinuman);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  showDetail(menuModel, modal) {
    this.modelId = menuModel.id;
    this.modalService.open(modal, { size: 'xl' });
  }
}
