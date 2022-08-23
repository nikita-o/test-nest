import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdvertisementModule } from './modules/advertisement/advertisement.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configs/configuration';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRoot('mongodb://localhost/sample'),
    EventEmitterModule.forRoot(),
    // My modules:
    UserModule,
    AuthModule,
    AdvertisementModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
