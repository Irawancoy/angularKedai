import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegisterService } from '../../services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  data: any;
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  createForm() {
    this.form = this.formBuilder.group({
      nama: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.registerService.register(this.form.value).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      Swal.fire({
        icon: 'success',
        title: 'Register Berhasil',
        text: 'Silahkan Login',
      });
      this.router.navigate(['/login']);
    });
  }
}
