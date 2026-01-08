// Interface cho Todo item
export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

// Interface cho response khi lấy danh sách todos
export interface TodosResponse {
    todos: Todo[];
    total: number;
    skip: number;
    limit: number;
}

// Interface cho request khi tạo/cập nhật todo
export interface TodoRequest {
    todo: string;
    completed: boolean;
    userId: number;
}

// Interface cho response khi xóa todo
export interface DeleteTodoResponse extends Todo {
    isDeleted: boolean;
    deletedOn: string;
}
