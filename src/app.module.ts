import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import mongoFactory from "./config/mongo.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mongoFactory],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>("mongo.uri"),
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
