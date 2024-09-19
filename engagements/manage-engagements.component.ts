import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-engagements',
  templateUrl: './manage-engagements.component.html',
})
export class ManageEngagementsComponent implements OnInit {
  engagements: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchEngagements();
  }

  fetchEngagements() {
    this.http.get('/api/engagements').subscribe(
      (response: any) => {
        this.engagements = response.engagements;
      },
      (error) => {
        console.error('Error fetching engagements:', error);
      }
    );
  }

  onStatusChange(engagement: any) {
    this.http.put(`/api/update-engagement/${engagement._id}`, { status: engagement.status }).subscribe(
      (response) => {
        console.log('Engagement status updated successfully:', response);
      },
      (error) => {
        console.error('Error updating engagement status:', error);
      }
    );
  }
}
