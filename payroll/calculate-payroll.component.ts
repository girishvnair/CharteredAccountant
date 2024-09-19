import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calculate-payroll',
  templateUrl: './calculate-payroll.component.html',
})
export class CalculatePayrollComponent {
  payroll = {
    employeeName: '',
    hoursWorked: 0,
    hourlyRate: 0,
    taxRate: 0,
  };
  calculatedPayroll: any = null;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('/api/calculate-payroll', this.payroll).subscribe(
      (response: any) => {
        this.calculatedPayroll = response;
      },
      (error) => {
        console.error('Error calculating payroll:', error);
      }
    );
  }
}
