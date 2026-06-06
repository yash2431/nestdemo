import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('College Course Enrollment API')
    .setDescription(
      `
## College Course Enrollment System

A RESTful API for managing courses, students, and enrollments.

### Authentication
Most admin endpoints require a **Bearer JWT token**. 
1. Use **POST /admin/login** (or **POST /admin/register** to create the first admin).
2. Copy the \`access_token\` from the response.
3. Click **Authorize** above and enter: \`Bearer <your_token>\`.

### Quick Start
1. Register an admin: \`POST /admin/register\`
2. Login: \`POST /admin/login\`
3. Create a course: \`POST /courses\` *(requires auth)*
4. Register a student: \`POST /students\`
5. Enroll student: \`POST /enrollments\`
    `,
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT-auth',
    )
    .addTag('Admin', 'Admin authentication and management')
    .addTag('Courses', 'Course creation and retrieval')
    .addTag('Students', 'Student registration and management')
    .addTag('Enrollments', 'Course enrollment operations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`\n🚀 Application running on: http://localhost:${port}`);
  console.log(`📖 Swagger UI available at: http://localhost:${port}/api\n`);
}

bootstrap();
