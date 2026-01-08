import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoService } from './services/todo.service';

@NgModule({
    declarations: [AppComponent, TodoListComponent, TodoFormComponent],
    imports: [
        BrowserModule, // Cần thiết cho mọi ứng dụng web Angular
        HttpClientModule, // Để sử dụng HttpClient
        FormsModule, // Để sử dụng ngModel
    ],
    providers: [TodoService], // Đăng ký dịch vụ TodoService
    bootstrap: [AppComponent], // Khởi động ứng dụng với AppComponent
})
export class AppModule {}
