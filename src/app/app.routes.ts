import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
	},
	{
		path: 'todos',
		loadComponent: () => import('./pages/todos/todos.component').then(m => m.TodosComponent)
	},
	{
		path: 'about',
		loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
	},
	{
		path: '**',
		redirectTo: '/home'
	}
];
