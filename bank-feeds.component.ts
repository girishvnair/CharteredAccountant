import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bank-feeds',
  templateUrl: './bank-feeds.component.html',
})
export class BankFeedsComponent {
  bankTransactions: any[] = [];

  constructor(private http: HttpClient) {}

  syncBankFeeds() {
    this.http.post('/api/sync-bank-feeds', {}).subscribe(
      (response: any) => {
        this.bankTransactions = response.transactions;
        console.log('Bank transactions synced:', response);
      },
      (error) => {
        console.error('Error syncing bank transactions:', error);
      }
    );
  }
}
