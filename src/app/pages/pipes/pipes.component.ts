import { Component } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  CurrencyPipe,
  UpperCasePipe,
  LowerCasePipe,
  TitleCasePipe,
  JsonPipe,
  SlicePipe,
  PercentPipe,
  DecimalPipe,
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { SortPipe } from '../../pipes/sort.pipe';
import { ReversePipe } from '../../pipes/reverse.pipe';

@Component({
  selector: 'app-pipes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    CurrencyPipe,
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    JsonPipe,
    SlicePipe,
    PercentPipe,
    DecimalPipe,
    HighlightPipe,
    TruncatePipe,
    TimeAgoPipe,
    SortPipe,
    ReversePipe,
  ],
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css'],
})
export class PipesComponent {
  // Data cho demo
  currentDate = new Date();
  pastDate = new Date('2025-12-01');
  price = 1234567.89;
  decimal = 3.14159265359;
  percentage = 0.75;

  longText =
    'Angular Pipes là một tính năng mạnh mẽ để transform data trong templates. Pipes giúp format và hiển thị dữ liệu một cách dễ dàng và có thể tái sử dụng.';

  searchTerm = 'Angular';
  highlightText = 'Angular Pipes là một tính năng mạnh mẽ của Angular Framework';

  users = [
    { name: 'Nguyen Van A', age: 25 },
    { name: 'Tran Thi B', age: 30 },
    { name: 'Le Van C', age: 22 },
    { name: 'Pham Thi D', age: 28 },
  ];

  numbers = [5, 2, 8, 1, 9, 3, 7];
  fruits = ['Táo', 'Chuối', 'Cam', 'Xoài', 'Nho'];

  reversibleText = 'Angular';

  objectData = {
    name: 'Angular Todo App',
    version: '17.0',
    features: ['Standalone', 'Router', 'Pipes'],
    active: true,
  };

  sortOrder: 'asc' | 'desc' = 'asc';
  sortProperty = 'name';

  toggleSort(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }
}
