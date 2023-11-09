import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SliderService } from '../../services/slider.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-slider',
  templateUrl: './form-slider.component.html',
  styleUrls: ['./form-slider.component.css'],
})
export class FormSliderComponent implements OnInit {
  @Input() sliderId: any;
  @Output() afterSave = new EventEmitter<boolean>();
  mode: string;
  formModel: {
    id: number;
    gambar: any;
  };
  imgSrc: any;
  constructor(private sliderService: SliderService) {}

  ngOnInit(): void {
    this.emptyForm();
  }

  emptyForm() {
    this.mode = 'add';
    this.formModel = {
      id: 0,
      gambar: '',
    };
    if (this.sliderId) {
      this.mode = 'edit';
      this.getSliderById(this.sliderId);
    }
  }
  getSliderById(Id) {
    this.sliderService.getSliderById(Id).subscribe(
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
      this.sliderService.postSlider(this.formModel).subscribe(
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
      this.sliderService.putSlider(this.formModel).subscribe(
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
