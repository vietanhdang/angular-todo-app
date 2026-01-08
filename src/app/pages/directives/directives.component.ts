import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../../directives/highlight.directive';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  active: boolean;
}

@Component({
  selector: 'app-directives',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightDirective, TooltipDirective, ClickOutsideDirective],
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css'],
})
export class DirectivesComponent {
  // Structural Directives Demo
  showContent = true;
  currentView: 'list' | 'grid' | 'table' = 'list';

  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', active: true },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'guest', active: false },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'user', active: true },
  ];

  selectedUser: User | null = null;

  // Attribute Directives Demo
  highlightColor = '#FFEB3B';
  dropdownOpen = false;

  // ngFor examples
  numbers = [1, 2, 3, 4, 5];

  // Directive documentation
  structuralDirectives = [
    {
      name: '*ngIf',
      syntax: '*ngIf="condition"',
      description: 'Điều kiện hiển thị element',
      examples: [
        '*ngIf="isVisible"',
        '*ngIf="user; else noUser"',
        '*ngIf="items.length > 0; then hasItems else noItems"',
      ],
    },
    {
      name: '*ngFor',
      syntax: '*ngFor="let item of items"',
      description: 'Lặp qua mảng/collection',
      examples: [
        '*ngFor="let item of items"',
        '*ngFor="let item of items; index as i"',
        '*ngFor="let item of items; trackBy: trackByFn"',
      ],
    },
    {
      name: '*ngSwitch',
      syntax: '[ngSwitch]="expression"',
      description: 'Switch-case cho template',
      examples: ['[ngSwitch]="status" / *ngSwitchCase="\'active\'" / *ngSwitchDefault'],
    },
  ];

  attributeDirectives = [
    {
      name: 'ngClass',
      syntax: '[ngClass]="expression"',
      description: 'Thêm/xóa CSS classes động',
      examples: [
        '[ngClass]="\'my-class\'"',
        "[ngClass]=\"['class1', 'class2']\"",
        "[ngClass]=\"{'active': isActive, 'disabled': isDisabled}\"",
      ],
    },
    {
      name: 'ngStyle',
      syntax: '[ngStyle]="expression"',
      description: 'Set inline styles động',
      examples: [
        '[ngStyle]="{\'color\': textColor}"',
        "[ngStyle]=\"{'font-size.px': fontSize, 'color': color}\"",
      ],
    },
    {
      name: 'ngModel',
      syntax: '[(ngModel)]="property"',
      description: 'Two-way data binding',
      examples: ['[(ngModel)]="username"', '[ngModel]="value" (ngModelChange)="onChange($event)"'],
    },
  ];

  // Methods
  toggleContent(): void {
    this.showContent = !this.showContent;
  }

  changeView(view: 'list' | 'grid' | 'table'): void {
    this.currentView = view;
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }

  getRoleBadgeClass(role: string): string {
    const classes: { [key: string]: string } = {
      admin: 'badge-admin',
      user: 'badge-user',
      guest: 'badge-guest',
    };
    return classes[role] || '';
  }

  trackByUserId(index: number, user: User): number {
    return user.id;
  }

  onClickOutside(): void {
    this.dropdownOpen = false;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  addUser(): void {
    const newUser: User = {
      id: this.users.length + 1,
      name: `User ${this.users.length + 1}`,
      email: `user${this.users.length + 1}@example.com`,
      role: 'user',
      active: true,
    };
    this.users.push(newUser);
  }

  removeUser(id: number): void {
    this.users = this.users.filter((u) => u.id !== id);
  }

  toggleUserStatus(user: User): void {
    user.active = !user.active;
  }

  selectRole(role: string): void {
    this.selectedUser = {
      id: 0,
      name: 'Test User',
      email: 'test@test.com',
      role: role as any,
      active: true,
    };
  }
}
