import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';

@Component({
	selector: 'app-todos',
	standalone: true,
	imports: [CommonModule, TodoListComponent],
	template: `
    <div class="page-container">
      <app-todo-list></app-todo-list>
    </div>
  `,
	styles: [`
    .page-container {
      padding: 20px;
      min-height: calc(100vh - 64px);
    }
  `]
})
export class TodosComponent { }
