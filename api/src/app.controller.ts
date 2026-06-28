import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('bookmarks')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
		getData() {
		return this.appService.getAllDataOfBookmarks();
	}
}
