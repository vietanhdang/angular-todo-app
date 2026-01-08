import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-todo-form',
    templateUrl: './todo-form.component.html',
    styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent {
    todoText: string = '';
    userId: number = 1;

    @Output() todoAdded = new EventEmitter<{ todo: string; userId: number }>();

    /**
     * Submit form để thêm todo mới
     */
    onSubmit(): void {
        if (this.todoText.trim()) {
            this.todoAdded.emit({
                todo: this.todoText,
                userId: this.userId,
            });

            // Reset form
            this.todoText = '';
        }
    }

    /**
     * Xử lý khi nhấn Enter trong input
     */
    onEnterKey(event: Event): void {
        event.preventDefault();
        this.onSubmit();
    }
}
