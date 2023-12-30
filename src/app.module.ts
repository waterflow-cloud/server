import { Module } from '@nestjs/common';
import { ApisModule } from './apis/apis.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ApisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
