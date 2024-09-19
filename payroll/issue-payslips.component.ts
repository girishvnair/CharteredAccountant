import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-issue-payslips',
  templateUrl: './issue-payslips.component.html',
})
export class IssuePayslipsComponent {
  payslipCriteria = {
    payrollDate: '',
  };
  payslipsIssued: boolean = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('/api/issue-payslips', this.payslipCriteria).subscribe(
      (response: any) => {
        this.payslipsIssued = true;
      },
      (error) => {
        console.error('Error issuing payslips:', error);
      }
    );
  }
}
