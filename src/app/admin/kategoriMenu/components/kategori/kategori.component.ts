import { KategoriService } from './../../services/kategori.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.css'],
})
export class KategoriComponent implements OnInit {
  listKategori: any;
  titleCard: string;
  isOpenForm: boolean = false;
  modelId: any;

  constructor(private kategoriService: KategoriService) {}

  ngOnInit(): void {
    this.getKategori();
  }

  getKategori() {
    this.kategoriService.getKategori().subscribe(
      (res: any) => {
        const { list, meta } = res.data;
        this.listKategori = list;
        console.log(this.listKategori);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  createKategori() {
    this.titleCard = 'Tambah Kategori';
    this.showForm(true);
    this.modelId = 0;
  }
  showForm(show) {
    this.isOpenForm = show;
  }
  updateKategori(kategoriModel) {
    this.titleCard = 'Edit Kategori' + kategoriModel.nama;
    this.modelId = kategoriModel.id;
    this.showForm(true);
  }
  deleteKategori(Id) {
    this.kategoriService.deleteKategori(Id).subscribe(
      (res: any) => {
        this.getKategori();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
