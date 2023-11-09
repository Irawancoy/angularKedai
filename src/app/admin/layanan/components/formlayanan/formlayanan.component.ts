import swal from 'sweetalert2';
import { LayananService } from './../../services/layanan.service';
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  SimpleChange,
} from '@angular/core';
import * as numeral from 'numeral';

@Component({
  selector: 'app-formlayanan',
  templateUrl: './formlayanan.component.html',
  styleUrls: ['./formlayanan.component.css'],
})
export class FormlayananComponent implements OnInit {
  @Input() layananId: any;
  @Output() afterSave = new EventEmitter<boolean>();
  mode: string;
  formModel: {
    id: number;
    nama: string;
    harga1jam: number;
    harga3jam: number;
    deskripsi: string;
    status: string;
    gambar: any;
  };
  imgSrc: any;
  constructor(private layananService: LayananService) {}

  ngOnInit(): void {
    this.emptyForm();
  }

  emptyForm() {
    this.mode = 'add';
    this.formModel = {
      id: 0,
      nama: '',
      harga1jam: 0,
      harga3jam: 0,
      deskripsi: '',
      gambar: '',
      status: '',
    };
    if (this.layananId) {
      this.mode = 'edit';
      this.getLayananById(this.layananId);
    }
  }
  getLayananById(Id) {
    this.layananService.getLayananById(Id).subscribe(
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
      if (typeof this.imgSrc !== undefined) {
        this.formModel.gambar = this.imgSrc;
      } else {
        this.imgSrc = '';
      }
      this.layananService.postLayanan(this.formModel).subscribe(
        (res: any) => {
          this.afterSave.emit(null);
          swal.fire('Berhasil', 'Data berhasil ditambahkan', 'success');
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
      this.layananService.putLayanan(this.formModel).subscribe(
        (res: any) => {
          this.afterSave.emit(null);
          swal.fire('Berhasil', 'Data berhasil diubah', 'success');
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
