import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './component-demo.component.html',
  styleUrls: ['./component-demo.component.css'],
})
export class ComponentDemoComponent {
  examples = [
    {
      title: '@Input - Parent to Child',
      description: 'Truyền dữ liệu từ component cha xuống component con',
      parentCode: `<!-- Parent Component -->
<app-todo-item 
  [todo]="todoData"
  [isEditing]="false">
</app-todo-item>`,
      childCode: `// Child Component
@Input() todo!: Todo;
@Input() isEditing: boolean = false;`,
    },
    {
      title: '@Output - Child to Parent',
      description: 'Gửi sự kiện từ component con lên component cha',
      parentCode: `<!-- Parent Component -->
<app-todo-item 
  (toggleComplete)="handleToggle($event)"
  (delete)="handleDelete($event)">
</app-todo-item>

// Parent TypeScript
handleToggle(todo: Todo) {
  console.log('Toggle:', todo);
}`,
      childCode: `// Child Component
@Output() toggleComplete = new EventEmitter<Todo>();
@Output() delete = new EventEmitter<number>();

onToggle() {
  this.toggleComplete.emit(this.todo);
}

onDelete() {
  this.delete.emit(this.todo.id);
}`,
    },
    {
      title: 'EventEmitter',
      description: 'Tạo custom events để giao tiếp giữa components',
      parentCode: `<!-- Parent listen to events -->
<app-child
  (customEvent)="handleCustomEvent($event)">
</app-child>

handleCustomEvent(data: any) {
  console.log('Received:', data);
}`,
      childCode: `// Child emit events
@Output() customEvent = new EventEmitter<any>();

triggerEvent() {
  this.customEvent.emit({
    message: 'Hello from child',
    timestamp: new Date()
  });
}`,
    },
  ];

  workflow = [
    {
      step: 1,
      title: 'Parent truyền data qua @Input',
      description: 'Parent component bind dữ liệu vào property của child component',
    },
    {
      step: 2,
      title: 'Child nhận data',
      description: 'Child component sử dụng @Input decorator để nhận dữ liệu',
    },
    {
      step: 3,
      title: 'User tương tác với Child',
      description: 'User click button, nhập text, hoặc trigger actions trong child',
    },
    {
      step: 4,
      title: 'Child emit event qua @Output',
      description: 'Child component sử dụng EventEmitter để gửi event lên parent',
    },
    {
      step: 5,
      title: 'Parent handle event',
      description: 'Parent component lắng nghe và xử lý event từ child',
    },
  ];

  benefits = [
    'Tách biệt logic: Mỗi component có trách nhiệm riêng',
    'Reusable: Component con có thể dùng ở nhiều nơi',
    'Maintainable: Dễ maintain và test từng component',
    'Type-safe: TypeScript đảm bảo type cho Input/Output',
    'Loosely coupled: Parent và Child không phụ thuộc chặt chẽ',
    'Clear contract: @Input/@Output định nghĩa rõ interface',
  ];
}
