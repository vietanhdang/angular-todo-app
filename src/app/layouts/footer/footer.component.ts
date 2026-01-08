import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent {
	currentYear = new Date().getFullYear();

	socialLinks = [
		{ name: 'GitHub', icon: '⚙️', url: 'https://github.com' },
		{ name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
		{ name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' }
	];

	quickLinks = [
		{ label: 'Home', route: '/home' },
		{ label: 'Todos', route: '/todos' },
		{ label: 'About', route: '/about' }
	];

	scrollToTop(): void {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
}
