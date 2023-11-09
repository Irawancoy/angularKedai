import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProsedurService } from '../../services/prosedur.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-form-prosedur',
  templateUrl: './form-prosedur.component.html',
  styleUrls: ['./form-prosedur.component.css'],
})
export class FormProsedurComponent implements OnInit {
  @Input() prosedurId: any;
  @Output() afterSave = new EventEmitter<boolean>();
  mode: string;
  formModel: {
    id: number;
    nomer: number;
    deskripsi: any;
  };
  constructor(private prosedurService: ProsedurService) {}

  ngOnInit(): void {
    this.emptyForm();
  }

  emptyForm() {
    this.mode = 'add';
    this.formModel = {
      id: 0,
      nomer: 0,
      deskripsi: '',
    };
    if (this.prosedurId) {
      this.mode = 'edit';
      this.getProsedurById(this.prosedurId);
    }
  }
  getProsedurById(Id) {
    this.prosedurService.getProsedurById(Id).subscribe(
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
      this.prosedurService.postProsedur(this.formModel).subscribe(
        (res: any) => {
          swal.fire('Berhasil', 'Data berhasil disimpan', 'success');
          this.afterSave.emit(true);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.prosedurService.putProsedur(this.formModel).subscribe(
        (res: any) => {
          swal.fire('Berhasil', 'Data berhasil diubah', 'success');
          this.afterSave.emit(true);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
