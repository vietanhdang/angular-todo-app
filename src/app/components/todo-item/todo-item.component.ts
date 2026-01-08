import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.model';

/**
 * Component hiển thị một todo item
 * Demo về Component Communication:
 * - @Input: Nhận dữ liệu từ parent component
 * - @Output: Gửi events lên parent component
 * - EventEmitter: Tạo custom events
 */
@Component({
	selector: 'app-todo-item',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './todo-item.component.html',
	styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
	/**
	 * @Input - Nhận todo data từ parent
	 * Parent sẽ bind: [todo]="todoData"
	 */
	@Input() todo!: Todo;

	/**
	 * @Input - Nhận trạng thái edit từ parent
	 */
	@Input() isEditing: boolean = false;

	/**
	 * @Input - Nhận edit text từ parent
	 */
	@Input() editText: string = '';

	/**
	 * @Output - Event khi toggle complete
	 * Parent lắng nghe: (toggleComplete)="handleToggle($event)"
	 */
	@Output() toggleComplete = new EventEmitter<Todo>();

	/**
	 * @Output - Event khi bắt đầu edit
	 */
	@Output() startEdit = new EventEmitter<Todo>();

	/**
	 * @Output - Event khi lưu edit
	 */
	@Output() saveEdit = new EventEmitter<number>();

	/**
	 * @Output - Event khi hủy edit
	 */
	@Output() cancelEdit = new EventEmitter<void>();

	/**
	 * @Output - Event khi xóa todo
	 */
	@Output() delete = new EventEmitter<number>();

	/**
	 * @Output - Event khi edit text thay đổi
	 */
	@Output() editTextChange = new EventEmitter<string>();

	/**
	 * Handle toggle complete
	 */
	onToggleComplete(): void {
		this.toggleComplete.emit(this.todo);
	}

	/**
	 * Handle start edit
	 */
	onStartEdit(): void {
		this.startEdit.emit(this.todo);
	}

	/**
	 * Handle save edit
	 */
	onSaveEdit(): void {
		this.saveEdit.emit(this.todo.id);
	}

	/**
	 * Handle cancel edit
	 */
	onCancelEdit(): void {
		this.cancelEdit.emit();
	}

	/**
	 * Handle delete
	 */
	onDelete(): void {
		this.delete.emit(this.todo.id);
	}

	/**
	 * Handle edit text change
	 */
	onEditTextChange(value: string): void {
		this.editTextChange.emit(value);
	}
}
