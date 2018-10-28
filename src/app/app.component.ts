import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  error: string;
  submitted = false;
  averagePurchaseRate: Number;
  saleStandardDeviation: Number;


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      type: ['eur', Validators.required],
      startDate: ['2017-11-20'],
      endDate: ['2017-11-24']
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = false;
    this.error = '';
    this.getAveragePurchaseRate();
    this.getSaleStandardDeviation();
  }

  getAveragePurchaseRate() {
    const url = `${environment.apiUrl}/currencies/` +
      `${this.f.type.value}/purchase/average-rate?startDate=${this.f.startDate.value}&endDate=${this.f.endDate.value}`;

    this.http.get<any>(url)
      .subscribe(res => {
        this.averagePurchaseRate = res.averageRate;
      }, error => {
        this.error = 'Typed data is incorrect';
      });
  }

  getSaleStandardDeviation() {
    const url = `${environment.apiUrl}/currencies/` +
      `${this.f.type.value}/sale/standard-deviation?startDate=${this.f.startDate.value}&endDate=${this.f.endDate.value}`;

    this.http.get<any>(url)
      .subscribe(res => {
        console.log(res);
        this.saleStandardDeviation = res.standardDeviation;
        this.submitted = true;
      }, error => {
        this.error = 'Typed data is incorrect';
        this.submitted = true;
      });
  }
}
