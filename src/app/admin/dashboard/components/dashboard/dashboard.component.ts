import { DashboardService } from '../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  listData: any;
  namaBulan: any;
  totalPerbulan: any;
  listYear: any;
  pHariIni: any;
  pKemarin: any;
  pBulanIni: any;
  pBulanKemarin: any;
  pTahunIni: any;
  pTahunKemarin: any;
  jDp: any;
  jCash: any;

  chartType: ChartType = 'doughnut';
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuad',
      animateRotate: true,
      animateScale: true,
    },
    legend: {
      position: 'bottom',
      labels: {
        fontSize: 14,
        usePointStyle: true,
      },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const label = data.labels[tooltipItem.index];
          const value = data.datasets[0].data[tooltipItem.index];
          return label + ': ' + value + '%';
        },
      },
    },
  };
  thisLastYearData: number[] = [];
  thisLastYearLabels: Label[] = [];

  todayYesterdayData: number[] = [];
  todayYesterdayLabels: Label[] = [];

  thisLastMonthData: number[] = [];
  thisLastMonthLabels: Label[] = [];

  thisJenisData: number[] = [];
  thisJenisLabels: Label[] = [];

  public barChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuad',
      animateRotate: true,
      animateScale: true,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [];

  public barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(54, 162, 235, 0.8)',
      borderColor: 'rgba(54, 162, 235, 1)',
      pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(54, 162, 235, 0.8)',
    },
  ];
  barChartLabels: any;
  public chartColors: Color[] = [
    {
      backgroundColor: ['	#FF00FF', '#00FFFF'], // atur warna background

      borderWidth: 1,
    },
  ];

  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dashboardService.getData().subscribe((res) => {
      // console.log(res);
      this.listData = res;
      console.log(this.listData);
      //barchart
      this.namaBulan = Object.values(this.listData.nama_bulan);
      this.barChartLabels = this.namaBulan;
      this.totalPerbulan = Object.values(this.listData.total_perbulan);
      this.barChartData = [{ data: this.totalPerbulan, label: 'Penjualan' }];

      //doughnut
      this.pHariIni = this.listData.hari_ini[0].total;
      this.pKemarin = this.listData.kemarin[0].total;
      // this.todayYesterdayData = [this.pHariIni, this.pKemarin];
      // this.todayYesterdayLabels = ['Hari Ini ', 'Kemarin'];
      const total = this.pHariIni + this.pKemarin;
      const pHariIniPercent = Math.round((this.pHariIni / total) * 100);
      const pKemarinPercent = 100 - pHariIniPercent;
      this.todayYesterdayData = [pHariIniPercent, pKemarinPercent];
      this.todayYesterdayLabels = [
        `Hari Ini (Rp. ${this.pHariIni})`,
        `Kemarin (Rp. ${this.pKemarin})`,
      ];

      console.log(this.todayYesterdayData);

      this.pBulanIni = this.listData.bulan_ini.total;
      console.log(this.pBulanIni);
      this.pBulanKemarin = this.listData.bulan_kemarin.total;
      const totalBulan = this.pBulanIni + this.pBulanKemarin;
      const pBulanIniPercent = Math.round((this.pBulanIni / totalBulan) * 100);
      const pBulanKemarinPercent = 100 - pBulanIniPercent;
      this.thisLastMonthData = [pBulanIniPercent, pBulanKemarinPercent];
      console.log(this.thisLastMonthData);
      this.thisLastMonthLabels = [
        `Bulan Ini (Rp. ${this.pBulanIni.toLocaleString()})`,
        `Bulan Kemarin (Rp. ${this.pBulanKemarin.toLocaleString()})`,
      ];

      this.pTahunIni = this.listData.tahun_ini[0].total;
      this.pTahunKemarin = this.listData.tahun_kemarin[0].total;
      const totalTahun = this.pTahunIni + this.pTahunKemarin;
      const pTahunIniPercent = Math.round((this.pTahunIni / totalTahun) * 100);
      const pTahunKemarinPercent = 100 - pTahunIniPercent;
      this.thisLastYearData = [pTahunIniPercent, pTahunKemarinPercent];
      this.thisLastYearLabels = [
        `Tahun Ini (Rp. ${this.pTahunIni})`,
        `Tahun Kemarin (Rp. ${this.pTahunKemarin})`,
      ];
      this.jCash = this.listData.cash[0].jumlah;
      this.jDp = this.listData.dp[0].jumlah;
      // console.log(this.jCash);
      // console.log(this.jDp);
      const totalJenis = this.jCash + this.jDp;
      const jCashPercent = Math.round((this.jCash / totalJenis) * 100);
      const jDpPercent = 100 - jCashPercent;
      this.thisJenisData = [jCashPercent, jDpPercent];
      this.thisJenisLabels = [`Cash (${this.jCash})`, `DP (${this.jDp})`];
    });
  }
}
