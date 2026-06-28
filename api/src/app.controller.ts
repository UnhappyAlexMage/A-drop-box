import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import type { Bookmark } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/bookmarks')
		getData() {
			return this.appService.getAllDataOfBookmarks();
		}

	@Post('/createbookmark')
		postData(@Body() newBookmark: Bookmark) {
			return this.appService.createNewBookmark(newBookmark);
		}

	@Delete('bookmarks/:id')
		deleteData(@Param('id') id: string) {
			return this.appService.deleteSelectedBookmark(id);
		}
}
