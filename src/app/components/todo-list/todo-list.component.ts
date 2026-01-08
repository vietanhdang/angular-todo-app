import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo, TodoRequest } from '../../models/todo.model';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoFormComponent, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  loading: boolean = false;
  error: string = '';

  // Phân trang
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  // Filter
  selectedUserId: number | null = null;
  filterCompleted: string = 'all'; // 'all', 'completed', 'pending'

  // Edit mode
  editingTodoId: number | null = null;
  editTodoText: string = '';

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
  ) {
    console.log('Route params:', this.route.snapshot.params);
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  /**
   * Load danh sách todos
   */
  loadTodos(): void {
    this.loading = true;
    this.error = '';

    const skip = (this.currentPage - 1) * this.itemsPerPage;

    // Nếu có filter theo user ID
    if (this.selectedUserId) {
      this.todoService.getTodosByUser(this.selectedUserId).subscribe({
        next: (response) => {
          this.todos = this.applyCompletedFilter(response.todos);
          this.totalItems = response.total;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Không thể tải danh sách todos';
          this.loading = false;
          console.error(err);
        },
      });
    } else {
      // Load tất cả todos với phân trang
      this.todoService.getAllTodos(this.itemsPerPage, skip).subscribe({
        next: (response) => {
          this.todos = this.applyCompletedFilter(response.todos);
          this.totalItems = response.total;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Không thể tải danh sách todos';
          this.loading = false;
          console.error(err);
        },
      });
    }
  }

  /**
   * Áp dụng filter theo trạng thái completed
   */
  applyCompletedFilter(todos: Todo[]): Todo[] {
    if (this.filterCompleted === 'completed') {
      return todos.filter((todo) => todo.completed);
    } else if (this.filterCompleted === 'pending') {
      return todos.filter((todo) => !todo.completed);
    }
    return todos;
  }

  /**
   * Lấy random todo
   */
  getRandomTodo(): void {
    this.loading = true;
    this.todoService.getRandomTodo().subscribe({
      next: (todo) => {
        // Thêm todo random vào đầu danh sách
        this.todos = [todo, ...this.todos];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Không thể lấy random todo';
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * Thêm todo mới
   */
  addTodo(todoText: string, userId: number): void {
    if (!todoText.trim()) {
      return;
    }

    const newTodo: TodoRequest = {
      todo: todoText,
      completed: false,
      userId: userId,
    };

    this.todoService.addTodo(newTodo).subscribe({
      next: (todo) => {
        // Thêm vào đầu danh sách
        this.todos = [todo, ...this.todos];
        this.error = '';
      },
      error: (err) => {
        this.error = 'Không thể thêm todo';
        console.error(err);
      },
    });
  }

  /**
   * Bật chế độ chỉnh sửa
   */
  startEdit(todo: Todo): void {
    this.editingTodoId = todo.id;
    this.editTodoText = todo.todo;
  }

  /**
   * Hủy chỉnh sửa
   */
  cancelEdit(): void {
    this.editingTodoId = null;
    this.editTodoText = '';
  }

  /**
   * Lưu chỉnh sửa
   */
  saveEdit(todoId: number): void {
    if (!this.editTodoText.trim()) {
      return;
    }

    this.todoService.updateTodo(todoId, { todo: this.editTodoText }).subscribe({
      next: (updatedTodo) => {
        // Cập nhật trong danh sách
        const index = this.todos.findIndex((t) => t.id === todoId);
        if (index !== -1) {
          this.todos[index] = { ...this.todos[index], todo: updatedTodo.todo };
        }
        this.cancelEdit();
        this.error = '';
      },
      error: (err) => {
        this.error = 'Không thể cập nhật todo';
        console.error(err);
      },
    });
  }

  /**
   * Toggle trạng thái completed
   */
  toggleComplete(todo: Todo): void {
    this.todoService.updateTodo(todo.id, { completed: !todo.completed }).subscribe({
      next: (updatedTodo) => {
        // Cập nhật trong danh sách
        const index = this.todos.findIndex((t) => t.id === todo.id);
        if (index !== -1) {
          this.todos[index] = { ...this.todos[index], completed: updatedTodo.completed };
        }
        this.error = '';
      },
      error: (err) => {
        this.error = 'Không thể cập nhật todo';
        console.error(err);
      },
    });
  }

  /**
   * Xóa todo
   */
  deleteTodo(todoId: number): void {
    if (!confirm('Bạn có chắc muốn xóa todo này?')) {
      return;
    }

    this.todoService.deleteTodo(todoId).subscribe({
      next: () => {
        // Xóa khỏi danh sách
        this.todos = this.todos.filter((t) => t.id !== todoId);
        this.error = '';
      },
      error: (err) => {
        this.error = 'Không thể xóa todo';
        console.error(err);
      },
    });
  }

  /**
   * Thay đổi trang
   */
  changePage(page: number): void {
    this.currentPage = page;
    this.loadTodos();
  }

  /**
   * Thay đổi filter
   */
  onFilterChange(): void {
    this.currentPage = 1;
    this.loadTodos();
  }

  /**
   * Tính tổng số trang
   */
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  /**
   * Kiểm tra có trang trước không
   */
  get hasPrevPage(): boolean {
    return this.currentPage > 1;
  }

  /**
   * Kiểm tra có trang sau không
   */
  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }
}
