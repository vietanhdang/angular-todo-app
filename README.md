# Angular Todo App - Hướng dẫn học tập

## 📚 Giới thiệu

Đây là một ứng dụng Todo đơn giản được xây dựng bằng Angular để học tập. Ứng dụng sử dụng API từ [DummyJSON](https://dummyjson.com) để thực hiện các thao tác CRUD (Create, Read, Update, Delete).

## 🎯 Tính năng

- ✅ Xem danh sách todos với phân trang
- ✅ Thêm todo mới
- ✅ Cập nhật todo (sửa nội dung, đánh dấu hoàn thành)
- ✅ Xóa todo
- ✅ Lấy random todo
- ✅ Lọc todos theo User ID
- ✅ Lọc theo trạng thái (hoàn thành/chưa hoàn thành)
- ✅ Phân trang với limit và skip

## 🚀 Cài đặt

### Yêu cầu

- Node.js (v18 hoặc cao hơn)
- npm hoặc yarn

### Các bước cài đặt

1. Cài đặt dependencies:

```bash
npm install
```

2. Chạy ứng dụng:

```bash
npm start
```

3. Mở trình duyệt và truy cập:

```
http://localhost:4200
```

## 📂 Cấu trúc Project

```
angular-todo/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── todo-list/          # Component hiển thị danh sách todos
│   │   │   │   ├── todo-list.component.ts
│   │   │   │   ├── todo-list.component.html
│   │   │   │   └── todo-list.component.css
│   │   │   └── todo-form/          # Component form thêm todo
│   │   │       ├── todo-form.component.ts
│   │   │       ├── todo-form.component.html
│   │   │       └── todo-form.component.css
│   │   ├── models/
│   │   │   └── todo.model.ts       # Interfaces và types
│   │   ├── services/
│   │   │   └── todo.service.ts     # Service gọi API
│   │   ├── app.component.ts        # Root component
│   │   └── app.module.ts           # Root module
│   ├── index.html                  # HTML chính
│   ├── main.ts                     # Entry point
│   └── styles.css                  # Global styles
├── angular.json                    # Angular configuration
├── package.json                    # Dependencies
└── tsconfig.json                   # TypeScript configuration
```

## 🧩 Các khái niệm Angular trong project

### 1. **Components** (Thành phần)

- **TodoListComponent**: Hiển thị và quản lý danh sách todos
- **TodoFormComponent**: Form để thêm todo mới
- Mỗi component gồm 3 file: .ts (logic), .html (template), .css (style)

### 2. **Services** (Dịch vụ)

- **TodoService**: Xử lý tất cả các HTTP requests đến API
- Sử dụng `HttpClient` để gọi API
- Injectable để có thể inject vào các component

### 3. **Models** (Mô hình dữ liệu)

- **Todo**: Interface định nghĩa cấu trúc dữ liệu todo
- **TodosResponse**: Interface cho response từ API
- **TodoRequest**: Interface cho request gửi đến API

### 4. **Modules** (Module)

- **AppModule**: Root module, khai báo tất cả components và imports
- Import `HttpClientModule` để sử dụng HTTP
- Import `FormsModule` để sử dụng two-way binding (ngModel)

### 5. **Data Binding**

- **Property Binding**: `[disabled]="!hasPrevPage"`
- **Event Binding**: `(click)="deleteTodo(todo.id)"`
- **Two-way Binding**: `[(ngModel)]="todoText"`
- **Interpolation**: `{{ todo.todo }}`

### 6. **Directives** (Chỉ thị)

- `*ngFor`: Lặp qua danh sách
- `*ngIf`: Hiển thị có điều kiện
- `[class.completed]`: Class binding động

### 7. **Dependency Injection** (DI)

```typescript
constructor(private todoService: TodoService) { }
```

Angular tự động inject TodoService vào component.

### 8. **Observables & RxJS**

```typescript
this.todoService.getAllTodos().subscribe({
    next: (response) => {
        /* xử lý dữ liệu */
    },
    error: (err) => {
        /* xử lý lỗi */
    },
});
```

### 9. **Component Communication**

- **@Output & EventEmitter**: TodoFormComponent gửi sự kiện lên parent

```typescript
@Output() todoAdded = new EventEmitter<{ todo: string, userId: number }>();
```

## 🔧 API Endpoints được sử dụng

| Method    | Endpoint          | Mô tả                            |
| --------- | ----------------- | -------------------------------- |
| GET       | `/todos`          | Lấy tất cả todos (có phân trang) |
| GET       | `/todos/:id`      | Lấy todo theo ID                 |
| GET       | `/todos/random`   | Lấy random todo                  |
| GET       | `/todos/user/:id` | Lấy todos của user               |
| POST      | `/todos/add`      | Thêm todo mới                    |
| PUT/PATCH | `/todos/:id`      | Cập nhật todo                    |
| DELETE    | `/todos/:id`      | Xóa todo                         |

## 💡 Các khái niệm quan trọng để học

### 1. **Lifecycle Hooks**

```typescript
ngOnInit(): void {
  this.loadTodos();  // Chạy khi component được khởi tạo
}
```

### 2. **Property Getters**

```typescript
get totalPages(): number {
  return Math.ceil(this.totalItems / this.itemsPerPage);
}
```

### 3. **Type Safety với TypeScript**

- Tất cả biến và function đều có type
- Interface giúp đảm bảo cấu trúc dữ liệu

### 4. **Error Handling**

```typescript
error: (err) => {
    this.error = 'Không thể tải danh sách todos';
    console.error(err);
};
```

### 5. **State Management**

- Component quản lý state local (loading, error, todos)
- Service không giữ state, chỉ gọi API

## 🎨 Styling

- Global styles trong `styles.css`
- Component-specific styles trong `.component.css`
- CSS Grid và Flexbox cho layout responsive
- CSS transitions cho animations

## 📝 Lưu ý khi học

1. **API là mock API**:
    - POST/PUT/DELETE không thực sự thay đổi dữ liệu trên server
    - Chỉ simulate response

2. **Best Practices**:
    - Tách logic vào services
    - Sử dụng TypeScript types
    - Handle errors properly
    - Unsubscribe observables khi cần (trong project này Angular tự động unsubscribe)

3. **Mở rộng thêm**:
    - Thêm routing cho nhiều pages
    - Sử dụng Reactive Forms thay vì Template-driven Forms
    - Thêm state management (NgRx, Akita)
    - Thêm animations
    - Thêm unit tests

## 🐛 Debug

Để xem console logs và network requests:

1. Mở DevTools (F12)
2. Tab Console: Xem logs và errors
3. Tab Network: Xem HTTP requests

## 📚 Tài liệu tham khảo

- [Angular Documentation](https://angular.io/docs)
- [RxJS Documentation](https://rxjs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [DummyJSON API](https://dummyjson.com)

## 🎓 Bài tập tự luyện

1. Thêm chức năng search todos
2. Thêm loading spinner
3. Thêm toast notifications
4. Thêm validation cho form
5. Thêm sorting (sắp xếp) theo các trường
6. Thêm dark mode
7. Lưu state vào localStorage
8. Thêm animations khi thêm/xóa items

Chúc bạn học tốt! 🚀
