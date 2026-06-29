import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

import { BookmarksService } from "./bookmarks.service";

import type { Bookmark } from "./interfaces/bookmark.interface";

@Controller()
export class BookmarksController {
    constructor(private readonly bookmarksService: BookmarksService) {}

    @Get('home/bookmarks')
        getDataBookmarks() {
            return this.bookmarksService.getAllDataOfBookmarks();
        }

    @Post('home/createbookmark')
        postDataBookmarks(@Body() newBookmark: Bookmark) {
            return this.bookmarksService.createNewBookmark(newBookmark);
        }

    @Delete('home/bookmarks/:id')
        deleteDataBookmarks(@Param(':id') id: string) {
            return this.bookmarksService.deleteSelectedBookmark(id);
        }
}