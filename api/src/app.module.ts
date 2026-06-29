import { Module } from '@nestjs/common';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { FolderModule } from './folders/folders.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    BookmarksModule,
    FolderModule,
    TagsModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
