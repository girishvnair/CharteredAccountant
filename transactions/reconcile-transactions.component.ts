import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reconcile-transactions',
  templateUrl: './reconcile-transactions.component.html',
})
export class ReconcileTransactionsComponent implements OnInit {
  transactionMatches: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchReconciliationData();
  }

  fetchReconciliationData() {
    this.http.get('/api/reconcile-transactions').subscribe(
      (response: any) => {
        this.transactionMatches = response.transactionMatches;
      },
      (error) => {
        console.error('Error fetching reconciliation data:', error);
      }
    );
  }

  markAsReconciled(match: any) {
    this.http.put(`/api/mark-reconciled/${match.ledgerTransaction._id}`, {}).subscribe(
      (response) => {
        match.reconciled = true;
        console.log('Transaction marked as reconciled:', response);
      },
      (error) => {
        console.error('Error marking transaction as reconciled:', error);
      }
    );
  }
}
