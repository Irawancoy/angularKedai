import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RekeningService } from '../../services/rekening.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-form-rekening',
  templateUrl: './form-rekening.component.html',
  styleUrls: ['./form-rekening.component.css'],
})
export class FormRekeningComponent implements OnInit {
  @Input() rekeningId: any;
  @Output() afterSave = new EventEmitter<boolean>();
  mode: string;
  formModel: {
    id: number;
    nama_pemilik: string;
    nama_bank: string;
    nomor_rekening: number;
  };
  constructor(private rekeningService: RekeningService) {}

  ngOnInit(): void {
    this.emptyForm();
  }
  emptyForm() {
    this.mode = 'add';
    this.formModel = {
      id: 0,
      nama_pemilik: '',
      nama_bank: '',
      nomor_rekening: 0,
    };
    if (this.rekeningId) {
      this.mode = 'edit';
      this.getRekeningById(this.rekeningId);
    }
  }

  getRekeningById(Id) {
    this.rekeningService.getRekeningById(Id).subscribe((res: any) => {
      this.formModel = res.data;
      console.log(this.formModel);
    });
  }
  save() {
    if (this.mode === 'add') {
      this.rekeningService.postRekening(this.formModel).subscribe(
        (res: any) => {
          this.afterSave.emit();
          swal.fire('Success', 'Data berhasil ditambahkan', 'success');
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.rekeningService.putRekening(this.formModel).subscribe(
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
}
