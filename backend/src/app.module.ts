import { Module } from '@nestjs/common';
import { CodeSessionModule } from './code-session/code-session.module';

@Module({
  imports: [CodeSessionModule],
})
export class AppModule {}
