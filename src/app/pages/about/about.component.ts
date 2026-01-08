import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-about',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.css']
})
export class AboutComponent {
	concepts = [
		{
			title: 'Standalone Components',
			description: 'Components tự quản lý dependencies, không cần NgModule',
			code: '@Component({ standalone: true, imports: [...] })'
		},
		{
			title: 'Angular Router',
			description: 'Navigation giữa các pages với lazy loading',
			code: 'loadComponent: () => import(...)'
		},
		{
			title: 'Services & DI',
			description: 'Dependency Injection để share logic giữa components',
			code: 'constructor(private service: Service) {}'
		},
		{
			title: 'HttpClient & Observables',
			description: 'Gọi API và xử lý dữ liệu reactive với RxJS',
			code: 'http.get<T>(url).subscribe(...)'
		},
		{
			title: 'Template-driven Forms',
			description: 'Forms với NgForm và validation',
			code: '<form #form="ngForm" (ngSubmit)="...">'
		},
		{
			title: 'Component Communication',
			description: '@Input, @Output, EventEmitter để truyền dữ liệu',
			code: '@Output() event = new EventEmitter()'
		}
	];

	apiEndpoints = [
		{ method: 'GET', url: '/todos', description: 'Lấy tất cả todos với phân trang' },
		{ method: 'GET', url: '/todos/:id', description: 'Lấy todo theo ID' },
		{ method: 'GET', url: '/todos/random', description: 'Lấy random todo' },
		{ method: 'GET', url: '/todos/user/:id', description: 'Lấy todos theo user ID' },
		{ method: 'POST', url: '/todos/add', description: 'Thêm todo mới' },
		{ method: 'PUT', url: '/todos/:id', description: 'Cập nhật todo' },
		{ method: 'DELETE', url: '/todos/:id', description: 'Xóa todo' }
	];
}
