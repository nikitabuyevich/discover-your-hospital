import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Discover Your Hospital';
  subtitle = 'Find the best hospital that meets your needs';

  currentYear = new Date();

  showSpinner = false;
  isAdmin = false;
}
