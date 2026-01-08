import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { TodoService } from './app/services/todo.service';

bootstrapApplication(AppComponent, {
	providers: [
		provideHttpClient(),
		TodoService
	]
}).catch(err => console.error(err));

