import { Component, OnInit, ViewChild } from '@angular/core';
import { SliderService } from '../../services/slider.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  listSlider: any;
  titleCard: any;
  modelId: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(
    private sliderService: SliderService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getSlider();
  }

  getSlider() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25, 50, 100],
      processing: true,
      searching: true,
    };
    this.sliderService.getSlider().subscribe((res: any) => {
      this.listSlider = res.data.list;
      console.log(this.listSlider);
      this.dtTrigger.next(null);
    });
  }
  createSlider(modal) {
    this.titleCard = 'Tambah Slider';
    this.modelId = 0;
    this.modalService.open(modal, { size: 'lg' });
  }
  updateSlider(sliderModel, modal) {
    this.titleCard = 'Edit Slider ';
    this.modelId = sliderModel.id;
    this.modalService.open(modal, {
      size: 'lg',
      backdrop: 'static',
    });
  }
  deleteSlider(Id) {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sliderService.deleteSlider(Id).subscribe(
          (res: any) => {
            Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
            this.reload();
          },
          (err: any) => {
            Swal.fire('Gagal!', 'Data gagal dihapus.', 'error');
          }
        );
      }
    });
  }
  reload() {
    window.location.reload();
  }
}
