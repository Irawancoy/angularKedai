import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TentangKamiService } from '../../services/tentang-kami.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-tentang-kami',
  templateUrl: './form-tentang-kami.component.html',
  styleUrls: ['./form-tentang-kami.component.css'],
})
export class FormTentangKamiComponent implements OnInit {
  @Input() tentangKamiId: any;
  @Output() afterSave = new EventEmitter<boolean>();
  mode: string;
  formModel: {
    id: number;
    judul: string;
    deskripsi: string;
    gambar: string;
    alamat: string;
    no_hp: any;
  };
  imgSrc: any;
  constructor(private tentangKamiService: TentangKamiService) {}

  ngOnInit(): void {
    this.emptyForm();
  }

  emptyForm() {
    this.mode = 'add';
    this.formModel = {
      id: 0,
      judul: '',
      deskripsi: '',
      gambar: '',
      alamat: '',
      no_hp: '',
    };
    if (this.tentangKamiId) {
      this.mode = 'edit';
      this.getTentangKami(this.tentangKamiId);
    }
  }
  getTentangKami(Id) {
    this.tentangKamiService.getTentangKamiById(Id).subscribe(
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
      this.tentangKamiService.postTentangKami(this.formModel).subscribe(
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
      this.tentangKamiService.putTentangKami(this.formModel).subscribe(
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
