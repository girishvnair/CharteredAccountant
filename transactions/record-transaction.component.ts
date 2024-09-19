import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-record-transaction',
  templateUrl: './record-transaction.component.html',
})
export class RecordTransactionComponent {
  transaction = {
    date: '',
    description: '',
    amount: 0,
    type: 'income',
    category: 'others',
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('/api/transactions', this.transaction).subscribe(
      (response) => {
        console.log('Transaction recorded successfully:', response);
      },
      (error) => {
        console.error('Error recording transaction:', error);
      }
    );
  }
}
