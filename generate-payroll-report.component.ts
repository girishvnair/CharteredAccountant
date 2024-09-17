import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-generate-payroll-report',
  templateUrl: './generate-payroll-report.component.html',
})
export class GeneratePayrollReportComponent {
  reportCriteria = {
    startDate: '',
    endDate: '',
  };
  payrollReport: any[] = [];

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('/api/payroll-report', this.reportCriteria).subscribe(
      (response: any) => {
        this.payrollReport = response.payrollReport;
      },
      (error) => {
        console.error('Error generating payroll report:', error);
      }
    );
  }
}
