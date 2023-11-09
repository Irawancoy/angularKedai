import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  formModel: {
    id: number;
    nama: string;
    email: string;
    password: string;
    gambar: string;
    foto: string;
    no_hp: string;
  };
  mode: string;
  imgSrc: any;
  ProfileId: any;
  emailLama: string;
  constructor(private profileServices: ProfileService) {}

  ngOnInit(): void {
    this.getMe();
    this.emptyForm();
  }

  emptyForm() {
    this.formModel = {
      id: 0,
      nama: '',
      email: '',
      password: '',
      gambar: '',
      foto: '',
      no_hp: '',
    };
  }
  getMe() {
    this.profileServices.getProfile().subscribe((res: any) => {
      this.formModel = res.data;
      this.emailLama = res.data.email;
      console.log(this.formModel);
      console.log(this.emailLama);
    });
  }

  save() {
    if (typeof this.imgSrc !== undefined) {
      this.formModel.foto = this.imgSrc;
    } else {
      this.imgSrc = '';
    }
    this.profileServices.editProfile(this.formModel).subscribe((res: any) => {
      console.log(res);
      swal.fire({
        icon: 'success',
        title: 'Update Berhasil',
        text: 'Terima Kasih',
      });
      window.location.reload();
      if (this.formModel.password || this.formModel.email != this.emailLama) {
        localStorage.removeItem('ctoken');
        window.location.reload();
      }
    });
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
