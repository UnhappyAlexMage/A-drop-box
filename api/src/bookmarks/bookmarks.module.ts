import { Module } from "@nestjs/common";

import { BookmarksService } from "./bookmarks.service";
import { BookmarksController } from "./bookmarks.controller";
import { FoldersService } from "../folders/folders.service";
import { TagsService } from "../tags/tags.service";

@Module({
    imports: [],
    exports: [],
    controllers: [BookmarksController],
    providers: [
        BookmarksService,
        FoldersService,
        TagsService,
    ],
})
export class BookmarksModule {}