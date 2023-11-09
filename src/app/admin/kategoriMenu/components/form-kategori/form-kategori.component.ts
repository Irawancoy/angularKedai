import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { KategoriService } from '../../services/kategori.service';

@Component({
  selector: 'app-form-kategori',
  templateUrl: './form-kategori.component.html',
  styleUrls: ['./form-kategori.component.css'],
})
export class FormKategoriComponent implements OnInit {
  @Input() kategoriId: any;
  @Output() afterSave = new EventEmitter<boolean>();
  mode: string;
  formModel: {
    id: number;
    nama: string;
    deskripsi: string;
    status: string;
  };

  constructor(private kategoriService: KategoriService) {}

  ngOnInit(): void {
    // this.getKategori(this.kategoriId);
    this.emptyForm();
  }
  emptyForm() {
    this.mode = 'add';
    this.formModel = {
      id: 0,
      nama: '',
      deskripsi: '',
      status: '',
    };
    if (this.kategoriId) {
      this.mode = 'edit';
      this.getKategori(this.kategoriId);
    }
  }

  getKategori(Id) {
    this.kategoriService.getKategoriById(Id).subscribe(
      (res: any) => {
        this.formModel = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  save() {
    if (this.mode === 'add') {
      this.kategoriService.postKategori(this.formModel).subscribe(
        (res: any) => {
          this.afterSave.emit();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.kategoriService
        .putKategori(this.kategoriId, this.formModel)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.afterSave.emit();
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
  back() {
    this.afterSave.emit(true);
  }
}
