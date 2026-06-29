import { Module } from "@nestjs/common";

import { BookmarksService } from "./bookmarks.service";
import { BookmarksController } from "./bookmarks.controller";

@Module({
    imports: [],
    exports: [],
    controllers: [BookmarksController],
    providers: [BookmarksService],
})
export class BookmarksModule {}