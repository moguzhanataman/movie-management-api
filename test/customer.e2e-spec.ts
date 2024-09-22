import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CustomerGuardOverride, TestingDatabase } from './testing-utils';
import { CustomerGuard } from 'src/auth/customer.guard';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestingDatabase, AppModule],
    })
      .overrideGuard(CustomerGuard)
      .useValue(CustomerGuardOverride)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  it('/movies (GET)', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .then((res) => expect(res.body.length).toBeGreaterThanOrEqual(0));
  });
});
