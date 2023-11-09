import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-detail-menu',
  templateUrl: './detail-menu.component.html',
  styleUrls: ['./detail-menu.component.css'],
})
export class DetailMenuComponent implements OnInit {
  @Input() menuId: any;

  menu: any;

  // menu: {
  //   id: number;
  //   nama: string;
  //   harga: number;
  //   deskripsi: string;
  //   gambar: any;
  // };
  constructor(private menuService: MenuService) {}
  ngOnInit(): void {
    // console.log(this.menuId);t
    this.getMenuById(this.menuId);
  }

  getMenuById(id) {
    this.menuService.getMenuById(id).subscribe(
      (res: any) => {
        this.menu = res.data;
        console.log(this.menu);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
