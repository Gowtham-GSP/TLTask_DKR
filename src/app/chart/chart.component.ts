import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { time } from 'highcharts';
import { AuthServiceService } from '../service/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import HC_fullscreen from 'highcharts/modules/full-screen';
import * as Highcharts from 'highcharts';

HC_exporting(Highcharts);
HC_exportData(Highcharts);
HC_fullscreen(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  // for getting local time
  public dateForm!: FormGroup;

  date1: Date = new Date();
  localDate: string = new Date().toLocaleDateString();

  Date1: any;
  Date2: any;

  Days: any;
  getDaysArray: any;
  //
  singleData: any;
  demoDate: any;

  showDate!: any;
  displayDate!: any;

  lineChart: any;
  dates: { date: any; '': any }[] | undefined;

  groupedData: { [key: string]: any[] } = {};

  dated: any;
  valueArray: number[] = [];

  totalUserRecords: any = [];
  filteredUserRecord: any = [];

  totalUser: any;
  filteredUser: any;
  constructor(
    private api: AuthServiceService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // this.getDataItem();

    this.getDate();
    this.getDateRange();
    // this.showDataInChart(this.valueArray);
    this.showGroup();
    this.groupDatByDate();
    // this.filteredDateRange()

    // this.fetchedData();
  }

  // fetchedData() {
  //   this.api.getUser().subscribe((res) => {
  //     this.totalUser = res;
  //     this.filteredUser = res;
  //     console.log(this.totalUser);
  //     console.log(this.filteredUser);
  //   });
  // }

  groupDatByDate() {
    this.api.getUser().subscribe((data) => {
      for (const item of data) {
        const date = item.creationDate;
        if (!this.groupedData[date]) {
          this.groupedData[date] = [];
        }
        this.groupedData[date].push(item);
      }
      console.log(this.groupedData);
      let totalCount = 0;
      const personMap = new Map<string, any>();

      const keyValueArray: { key: any; value: any }[] = [];
      var dateArray = [];
      var userCountArray = [];

      for (const date in this.groupedData) {
        if (this.groupedData.hasOwnProperty(date)) {
          const dateArr = this.groupedData[date];
          const count = dateArr.length;
          dateArray.push(date);
          ~userCountArray.push(count);
          console.log(count);
          this.valueArray.push(count);

          // Here, y add data grouped by date to the keyValueArray
          keyValueArray.push({ key: date, value: dateArr });

          personMap.set(date, dateArr);

          // totalCount += count;
          console.log(`Count for ${date}: ${count}`);
        }
        this.showDataInChart(userCountArray, dateArray);
      }

      console.log(keyValueArray); // Contains data grouped by date
      console.log(personMap); // Contains data grouped by date as well
    });
  }

  CalculateDays() {
    const dateModified1 = new Date(this.Date1);
    const dateModified2 = new Date(this.Date2);

    const Time = dateModified2.getTime() - dateModified1.getTime();

    // this.Days = Time / (1000 * 3600 * 24);

    // to get dates
    const dateArray = [];
    //  this method use to get date using the dateRange
    for (
      let DATE = dateModified1;
      DATE <= dateModified2;
      DATE.setDate(DATE.getDate() + 1)
    ) {
      dateArray.push(new Date(DATE).toLocaleDateString());
    }
    console.log(dateArray.toLocaleString());
  }

  getDateRange() {
    this.api.getUser().subscribe((res) => {
      const startDate: Date = new Date(this.Date1);
      const endDate: Date = new Date(this.Date2);
      // const time = endDate.getTime() - startDate.getTime();
      // this.Days = time / (1000 * 3600 * 24);
      // console.log(this.Days);

      if (endDate < startDate) {
        alert('The "To" date cannot be less than the "From" date.');
        return; // Exit the function early
      }
      // Filter data within the date range
      const filteredData = res.filter((item: any) => {
        const itemDate = new Date(item.creationDate);
        return itemDate >= startDate && itemDate <= endDate;
      });

      // get total num of user
      this.displayDate = filteredData.length;

      // Group the filtered data by date and calculate the total count
      const dateCountMap = new Map<string, number>();
      for (const item of filteredData) {
        const date1 = item.creationDate;
        dateCountMap.set(date1, (dateCountMap.get(date1) || 0) + 1);
      }

      // Extract dates and counts from the map
      const dateArray = Array.from(dateCountMap.keys());
      const countArray = Array.from(dateCountMap.values());

      // Display the chart with the extracted data
      this.showDataInChart(countArray, dateArray);

      //
    });
  }

  // this method used to get total number of user as count
  getDate() {
    this.api.getUser().subscribe((res) => {
      // console.log(res);
      let demo = res.filter(
        (item: { creationDate: any }) => item.creationDate === item.creationDate
      );
      let demoDate: any = [];
      for (let i = 0; i < demo.length; i++) {
        demoDate[i] = demo[i].creationDate;
      }
      this.showDate = demoDate.length;
      console.log('demoDate', this.showDate);
      this.filteredUserRecord;
      this.totalUserRecords;
      // console.log(demo[0].date);
    });
  }

  showGroup() {
    interface groupeByDate {
      creationDate: string;
      jsonDate: any;
    }
    var dates: groupeByDate[] = [];
    this.api.getUser().subscribe((res) => {
      const group = res.reduce((acc: any, cur: any) => {
        let key = cur.creationDate;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(cur);
        return acc;
      }, {});
      dates = Object.keys(group).map((key) => {
        return {
          creationDate: key,
          jsonDate: group[key],
        };
      });
      console.log(dates);
    });
  }

  showDataInChart(valueArray: number[], dateArray: string[]) {
    // debugger;
    // const integerArray: number[] = [];
    // integerArray.push(valueArray);

    this.lineChart = new Chart({
      chart: {
        type: 'line',
      },
      title: {
        text: 'Details',
      },
      credits: {
        enabled: false,
      },
      yAxis: {
        title: {
          text: 'Number of users',
        },
      },
      xAxis: {
        title: {
          text: 'Date`',
        },
        categories: dateArray,
      },
      series: [
        {
          name: 'Registered users',

          data: valueArray,
        } as any,
      ],
      // this method used enable hamburger
      exporting: {
        enabled: true, // Enable export options (including the hamburger menu)
        buttons: {
          contextButton: {
            menuItems: [
              'viewFullscreen',
              'printChart',
              'separator',
              'downloadPNG',
              'downloadJPEG',
              'downloadPDF',
              'downloadSVG',
              'downloadXLS',
            ],
          },
        },
      },
    });
  }
}
