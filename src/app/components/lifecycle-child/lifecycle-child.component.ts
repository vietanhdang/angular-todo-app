import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  SimpleChanges,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Child component để demo lifecycle hooks
 */
@Component({
  selector: 'app-lifecycle-child',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lifecycle-child">
      <h4>🧒 Child Component</h4>
      <p>Counter: {{ counter }}</p>
      <p>Data: {{ data }}</p>
      <div class="child-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .lifecycle-child {
        background: #e7f3ff;
        border: 2px solid #2196f3;
        border-radius: 10px;
        padding: 20px;
        margin-top: 15px;
      }
      .lifecycle-child h4 {
        color: #2196f3;
        margin-bottom: 10px;
      }
      .child-content {
        margin-top: 10px;
        padding: 10px;
        background: white;
        border-radius: 5px;
      }
    `,
  ],
})
export class LifecycleChildComponent
  implements
    OnInit,
    OnDestroy,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  @Input() counter: number = 0;
  @Input() data: string = '';

  constructor() {
    this.log('Constructor', 'Component được khởi tạo');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.log('ngOnChanges', `Input properties thay đổi: ${JSON.stringify(changes)}`);
  }

  ngOnInit(): void {
    this.log('ngOnInit', 'Component được initialize, data bindings đã sẵn sàng');
  }

  ngDoCheck(): void {
    this.log('ngDoCheck', 'Change detection chạy');
  }

  ngAfterContentInit(): void {
    this.log('ngAfterContentInit', 'Content (ng-content) đã được khởi tạo');
  }

  ngAfterContentChecked(): void {
    this.log('ngAfterContentChecked', 'Content đã được check');
  }

  ngAfterViewInit(): void {
    this.log('ngAfterViewInit', 'View đã được khởi tạo hoàn toàn');
  }

  ngAfterViewChecked(): void {
    this.log('ngAfterViewChecked', 'View đã được check');
  }

  ngOnDestroy(): void {
    this.log('ngOnDestroy', '💥 Component sắp bị hủy');
  }

  private log(hook: string, message: string): void {
    console.log(`[Child] ${hook}: ${message}`);
  }
}
