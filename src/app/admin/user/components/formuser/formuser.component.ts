import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-formuser',
  templateUrl: './formuser.component.html',
  styleUrls: ['./formuser.component.css'],
})
export class FormuserComponent implements OnInit {
  @Input() userId: any;
  @Output() afterSave = new EventEmitter<boolean>();
  mode: string;
  formModel: {
    id: number;
    nama: string;
    email: string;
    password: string;
    foto: string;
  };
  imgSrc: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.emptyForm();
  }
  emptyForm() {
    this.mode = 'add';
    this.formModel = {
      id: 0,
      nama: '',
      email: '',
      password: '',
      foto: '',
    };
    if (this.userId) {
      this.mode = 'edit';
      this.getUserById(this.userId);
    }
  }
  getUserById(Id) {
    this.userService.getUserById(Id).subscribe(
      (res: any) => {
        this.formModel = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  save() {
    if (this.mode == 'add') {
      if (typeof this.imgSrc !== undefined) {
        this.formModel.foto = this.imgSrc;
      } else {
        this.imgSrc = '';
      }
      this.userService.postUser(this.formModel).subscribe(
        (res: any) => {
          swal.fire('Success', 'User berhasil ditambahkan', 'success');
          this.afterSave.emit(true);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      if (typeof this.imgSrc !== undefined) {
        this.formModel.foto = this.imgSrc;
      } else {
        this.imgSrc = '';
      }
      this.userService.putUser(this.formModel).subscribe(
        (res: any) => {
          swal.fire('Success', 'User berhasil diubah', 'success');
          this.afterSave.emit(true);
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
