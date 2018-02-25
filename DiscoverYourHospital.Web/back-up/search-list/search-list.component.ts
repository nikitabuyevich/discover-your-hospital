import {Component, OnInit, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { LicenseService } from '../license.service';
import { License } from '../license';
import { LicensesComponent } from './../licenses/licenses.component';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html'
})
export class SearchListComponent implements OnInit {
  total$: Observable<number>;
  items$: Observable<License[]>;

  terms = '';
  private searchTermStream = new Subject<string>();

  page = 1;
  private pageStream = new Subject<number>();

  constructor(
      protected licenseComponent: LicensesComponent
      ) { }

  ngOnInit() {
    const searchSource = this.searchTermStream
      .debounceTime(200)
      .distinctUntilChanged()
      .map(searchTerm => {
        this.terms = searchTerm;
        return {search: searchTerm, page: 1};
      });

    const pageSource = this.pageStream.map(pageNumber => {
      this.page = pageNumber;
      return {search: this.terms, page: pageNumber};
    });

    const source = pageSource
      .merge(searchSource)
      .startWith({search: this.terms, page: this.page})
      .switchMap((params: {search: string, page: number}) => {
        return this.licenseComponent.list(params.search, params.page)
      })
      .share();

    this.total$ = source.pluck('total');
    this.items$ = source.pluck('items');
  }

  search(terms: string) {
    this.searchTermStream.next(terms)
  }

  goToPage(page: number) {
    this.pageStream.next(page)
  }
}
