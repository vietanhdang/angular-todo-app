import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'todos',
    loadComponent: () => import('./pages/todos/todos.component').then((m) => m.TodosComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'pipes',
    loadComponent: () => import('./pages/pipes/pipes.component').then((m) => m.PipesComponent),
  },
  {
    path: 'component-demo',
    loadComponent: () =>
      import('./pages/component-demo/component-demo.component').then(
        (m) => m.ComponentDemoComponent,
      ),
  },
  {
    path: 'lifecycle',
    loadComponent: () =>
      import('./pages/lifecycle/lifecycle.component').then((m) => m.LifecycleComponent),
  },
  {
    path: 'directives',
    loadComponent: () =>
      import('./pages/directives/directives.component').then((m) => m.DirectivesComponent),
  },
  {
    path: 'reactive-forms',
    loadComponent: () =>
      import('./pages/reactive-forms/reactive-forms.component').then(
        (m) => m.ReactiveFormsComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
