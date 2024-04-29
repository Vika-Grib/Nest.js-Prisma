import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PostsController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/posts (GET)', async () => {
    await request(app.getHttpServer())
      .get('/posts')
      .expect(200) 
      .then(response => {
        expect(response.body).toBeInstanceOf(Array); 
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

