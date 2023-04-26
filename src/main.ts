import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    session({
      secret: "my-secret",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(cookieParser());
  setupSwagger(app);
  await app.listen(5090);
  console.log("Server is listening on: http://localhost:5090");
  console.log("API docs : http://localhost:5090/api");
}
function setupSwagger(app: INestApplication) {
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle("ParkAlert")
    .setDescription("ParkAlert Swagger document.")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
}
bootstrap();
