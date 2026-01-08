import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LifecycleChildComponent } from '../../components/lifecycle-child/lifecycle-child.component';

interface LogEntry {
  timestamp: Date;
  hook: string;
  message: string;
  component: 'parent' | 'child';
}

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [CommonModule, FormsModule, LifecycleChildComponent],
  templateUrl: './lifecycle.component.html',
  styleUrls: ['./lifecycle.component.css'],
})
export class LifecycleComponent implements OnInit, OnDestroy, AfterViewInit {
  // Demo state
  counter: number = 0;
  childData: string = 'Initial data';
  showChild: boolean = true;
  logs: LogEntry[] = [];
  intervalId: any;

  // Lifecycle info
  lifecycleHooks = [
    {
      name: 'constructor()',
      order: 1,
      timing: 'Trước tất cả',
      description: 'Khởi tạo class, inject dependencies',
      usage: 'Khởi tạo properties, inject services',
      color: '#9C27B0',
    },
    {
      name: 'ngOnChanges()',
      order: 2,
      timing: 'Trước ngOnInit và khi @Input thay đổi',
      description: 'Được gọi khi @Input properties thay đổi',
      usage: 'React to input changes, validate input',
      color: '#F44336',
    },
    {
      name: 'ngOnInit()',
      order: 3,
      timing: 'Một lần sau constructor',
      description: 'Component được khởi tạo, data bindings sẵn sàng',
      usage: 'Initialize component, fetch data, setup subscriptions',
      color: '#2196F3',
    },
    {
      name: 'ngDoCheck()',
      order: 4,
      timing: 'Mỗi lần change detection',
      description: 'Detect và act upon changes mà Angular không catch',
      usage: 'Custom change detection logic',
      color: '#FF9800',
    },
    {
      name: 'ngAfterContentInit()',
      order: 5,
      timing: 'Một lần sau khi ng-content được project',
      description: 'Content (ng-content) đã được khởi tạo',
      usage: 'Access projected content',
      color: '#4CAF50',
    },
    {
      name: 'ngAfterContentChecked()',
      order: 6,
      timing: 'Sau ngAfterContentInit và mỗi ngDoCheck',
      description: 'Content đã được check',
      usage: 'Respond to content changes',
      color: '#00BCD4',
    },
    {
      name: 'ngAfterViewInit()',
      order: 7,
      timing: 'Một lần sau khi view được khởi tạo',
      description: 'View và child views đã được khởi tạo',
      usage: 'Access ViewChild, DOM manipulation',
      color: '#673AB7',
    },
    {
      name: 'ngAfterViewChecked()',
      order: 8,
      timing: 'Sau ngAfterViewInit và mỗi ngAfterContentChecked',
      description: 'View đã được check',
      usage: 'Respond to view changes',
      color: '#E91E63',
    },
    {
      name: 'ngOnDestroy()',
      order: 9,
      timing: 'Trước khi component bị hủy',
      description: 'Cleanup trước khi component bị destroy',
      usage: 'Unsubscribe observables, detach event handlers, clean timers',
      color: '#f44336',
    },
  ];

  constructor() {
    this.addLog('Constructor', 'Parent component được khởi tạo', 'parent');
    console.log('[Parent] Constructor called');
  }

  ngOnInit(): void {
    this.addLog('ngOnInit', 'Parent initialized, có thể fetch data', 'parent');
    console.log('[Parent] ngOnInit called');

    // Simulate data fetching
    setTimeout(() => {
      this.childData = 'Data loaded from API';
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.addLog('ngAfterViewInit', 'Parent view đã sẵn sàng', 'parent');
    console.log('[Parent] ngAfterViewInit called');
  }

  ngOnDestroy(): void {
    this.addLog('ngOnDestroy', '💥 Parent component bị hủy', 'parent');
    console.log('[Parent] ngOnDestroy called');
    this.clearLogs();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Demo actions
  incrementCounter(): void {
    this.counter++;
    this.addLog('Action', `Counter tăng lên ${this.counter}`, 'parent');
  }

  updateData(): void {
    this.childData = `Updated at ${new Date().toLocaleTimeString()}`;
    this.addLog('Action', 'Child data được cập nhật', 'parent');
  }

  toggleChild(): void {
    this.showChild = !this.showChild;
    this.addLog('Action', this.showChild ? 'Child được tạo mới' : 'Child bị destroy', 'parent');
  }

  clearLogs(): void {
    this.logs = [];
  }

  startAutoIncrement(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      return;
    }

    this.intervalId = setInterval(() => {
      this.counter++;
    }, 1000);
  }

  private addLog(hook: string, message: string, component: 'parent' | 'child'): void {
    this.logs.push({
      timestamp: new Date(),
      hook,
      message,
      component,
    });

    // Keep only last 50 logs
    if (this.logs.length > 50) {
      this.logs.shift();
    }
  }

  getHookColor(hookName: string): string {
    const hook = this.lifecycleHooks.find((h) => h.name === hookName);
    return hook ? hook.color : '#666';
  }

  trackByIndex(index: number): number {
    return index;
  }
}
