import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors()
	setupSwagger(app)
	const server = await app.listen(3000)
	const address = server.address()
	const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const host = address.address === '::' ? 'localhost' : address.address
  const port = address.port
  const appUrl = `${protocol}://${host}:${port}`
	console.log(`Server is listening on: ${appUrl}`)
	console.log(`API docs : ${appUrl}/api`)
}
function setupSwagger(app: INestApplication) {
	const builder = new DocumentBuilder()
	const config = builder
		.setTitle('ParkAlert')
		.setDescription('ParkAlert Swagger document.')
		.setVersion('1.0')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)
}
bootstrap()
