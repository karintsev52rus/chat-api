import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exeption-filters/http-exeption.filter';
import { validationPipe } from './pipes/validation-pipe';

const PORT = +process.env.PORT;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(validationPipe);
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(PORT);
    console.log('Server started on port', PORT);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
