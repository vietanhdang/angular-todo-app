import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo, TodosResponse, TodoRequest, DeleteTodoResponse } from '../models/todo.model';

@Injectable({
    providedIn: 'root',
})
export class TodoService {
    private apiUrl = 'https://dummyjson.com/todos';

    constructor(private http: HttpClient) {}

    /**
     * Lấy tất cả todos với phân trang
     * @param limit - Số lượng items trên mỗi trang (mặc định: 10)
     * @param skip - Số lượng items bỏ qua (mặc định: 0)
     */
    getAllTodos(limit: number = 10, skip: number = 0): Observable<TodosResponse> {
        const params = new HttpParams().set('limit', limit.toString()).set('skip', skip.toString());

        return this.http.get<TodosResponse>(this.apiUrl, { params });
    }

    /**
     * Lấy một todo theo ID
     * @param id - ID của todo
     */
    getTodoById(id: number): Observable<Todo> {
        return this.http.get<Todo>(`${this.apiUrl}/${id}`);
    }

    /**
     * Lấy một todo ngẫu nhiên
     */
    getRandomTodo(): Observable<Todo> {
        return this.http.get<Todo>(`${this.apiUrl}/random`);
    }

    /**
     * Lấy tất cả todos của một user
     * @param userId - ID của user
     */
    getTodosByUser(userId: number): Observable<TodosResponse> {
        return this.http.get<TodosResponse>(`${this.apiUrl}/user/${userId}`);
    }

    /**
     * Thêm todo mới
     * @param todoData - Dữ liệu của todo mới
     */
    addTodo(todoData: TodoRequest): Observable<Todo> {
        return this.http.post<Todo>(`${this.apiUrl}/add`, todoData);
    }

    /**
     * Cập nhật todo
     * @param id - ID của todo cần cập nhật
     * @param todoData - Dữ liệu cập nhật (có thể partial)
     */
    updateTodo(id: number, todoData: Partial<TodoRequest>): Observable<Todo> {
        return this.http.put<Todo>(`${this.apiUrl}/${id}`, todoData);
    }

    /**
     * Xóa todo
     * @param id - ID của todo cần xóa
     */
    deleteTodo(id: number): Observable<DeleteTodoResponse> {
        return this.http.delete<DeleteTodoResponse>(`${this.apiUrl}/${id}`);
    }
}
