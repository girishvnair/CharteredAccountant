import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
})
export class SearchClientComponent {
  searchQuery: string = '';
  clients: any[] = [];

  constructor(private http: HttpClient) {}

  onSearch() {
    if (this.searchQuery) {
      this.http
        .get(`/api/search-client?query=${this.searchQuery}`)
        .subscribe((response: any) => {
          this.clients = response.clients;
        }, (error) => {
          console.error('Error searching clients:', error);
        });
    }
  }
}
