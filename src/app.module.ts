import { Module } from '@nestjs/common';
import { HtmlTimeTableController } from './app.controller';

@Module({
  imports: [],
  controllers: [HtmlTimeTableController],
})
export class AppModule {}
