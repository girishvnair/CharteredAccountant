import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categorize-transaction',
  templateUrl: './categorize-transaction.component.html',
})
export class CategorizeTransactionComponent implements OnInit {
  transactions: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTransactions();
  }

  fetchTransactions() {
    this.http.get('/api/transactions').subscribe(
      (response: any) => {
        this.transactions = response.transactions;
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }

  updateCategory(transaction: any) {
    this.http.put(`/api/update-transaction/${transaction._id}`, { category: transaction.category }).subscribe(
      (response) => {
        console.log('Transaction category updated successfully:', response);
      },
      (error) => {
        console.error('Error updating transaction category:', error);
      }
    );
  }
}
