import { Module } from '@nestjs/common';
import { CodeSessionGateway } from './code-session.gateway';

@Module({
  providers: [CodeSessionGateway],
})
export class CodeSessionModule {}
