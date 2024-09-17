import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tax-filing',
  templateUrl: './tax-filing.component.html',
})
export class TaxFilingComponent {
  filingCriteria = {
    startDate: '',
    endDate: '',
  };
  filingResult: any = null;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('/api/file-taxes', this.filingCriteria).subscribe(
      (response: any) => {
        this.filingResult = response;
      },
      (error) => {
        console.error('Error filing taxes:', error);
      }
    );
  }
}
