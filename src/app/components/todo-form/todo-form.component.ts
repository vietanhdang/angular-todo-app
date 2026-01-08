import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent {
  @ViewChild('todoForm') todoForm!: NgForm;
  @Output() todoAdded = new EventEmitter<{ todo: string; userId: number }>();

  // Model cho form
  todoModel = {
    todoText: '',
    userId: 1,
  };

  /**
   * Submit form để thêm todo mới
   */
  onSubmit(form: NgForm): void {
    // Kiểm tra form có valid không
    if (form.valid && this.todoModel.todoText.trim()) {
      this.todoAdded.emit({
        todo: this.todoModel.todoText,
        userId: this.todoModel.userId,
      });

      // Reset form về trạng thái ban đầu
      form.resetForm({
        todoText: '',
        userId: 1,
      });
    }
  }

  /**
   * Reset form
   */
  resetForm(): void {
    if (this.todoForm) {
      this.todoForm.resetForm({
        todoText: '',
        userId: 1,
      });
    }
  }
}
