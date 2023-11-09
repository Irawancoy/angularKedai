import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-formmenu',
  templateUrl: './formmenu.component.html',
  styleUrls: ['./formmenu.component.css'],
})
export class FormmenuComponent implements OnInit {
  @Input() menuId: any;
  @Output() afterSave = new EventEmitter<boolean>();
  mode: string;
  formModel: {
    id: number;
    nama: string;
    harga: number;
    deskripsi: string;
    status: any;
    gambar: string;
    kategori: any;
  };
  imgSrc: any;
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    // this.getKategori();
    this.emptyForm();
    // this.getMenu(this.menuId);
  }

  emptyForm() {
    this.mode = 'add';
    this.formModel = {
      id: 0,
      nama: '',
      harga: 0,
      deskripsi: '',
      gambar: '',
      status: '',
      kategori: '',
    };
    if (this.menuId) {
      this.mode = 'edit';
      this.getMenu(this.menuId);
    }
  }
  getMenu(Id) {
    this.menuService.getMenuById(Id).subscribe(
      (res: any) => {
        this.formModel = res.data;
        console.log(this.formModel);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  save() {
    if (this.mode === 'add') {
      if (typeof this.imgSrc !== undefined) {
        this.formModel.gambar = this.imgSrc;
      } else {
        this.imgSrc = '';
      }
      this.menuService.postMenu(this.formModel).subscribe(
        (res: any) => {
          this.afterSave.emit();
          swal.fire('Success', 'Data berhasil ditambahkan', 'success');
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      if (typeof this.imgSrc !== undefined) {
        this.formModel.gambar = this.imgSrc;
      } else {
        this.imgSrc = '';
      }
      this.menuService.putMenu(this.formModel).subscribe(
        (res: any) => {
          this.afterSave.emit();
          swal.fire('Success', 'Data berhasil diubah', 'success');
        },
        (err) => {
          console.log(err);
        }
      );
    }
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
