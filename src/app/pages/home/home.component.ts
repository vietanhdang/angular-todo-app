import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
	features = [
		{
			icon: '✅',
			title: 'CRUD Operations',
			description: 'Thêm, sửa, xóa và xem danh sách todos'
		},
		{
			icon: '🔍',
			title: 'Filter & Search',
			description: 'Lọc todos theo user ID và trạng thái'
		},
		{
			icon: '📄',
			title: 'Pagination',
			description: 'Phân trang với limit và skip'
		},
		{
			icon: '🎲',
			title: 'Random Todo',
			description: 'Lấy ngẫu nhiên một todo từ API'
		},
		{
			icon: '🚀',
			title: 'Standalone Components',
			description: 'Sử dụng Angular standalone components'
		},
		{
			icon: '🛣️',
			title: 'Angular Router',
			description: 'Routing với lazy loading'
		}
	];
}
