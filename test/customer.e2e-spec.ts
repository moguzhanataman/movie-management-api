import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CustomerGuard } from '../src/auth/customer.guard';
import { CustomerGuardOverride, seedTestDatabase, TestingDatabase } from './testing-utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let movieRepo;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestingDatabase, AppModule],
    })
      .overrideGuard(CustomerGuard)
      .useValue(CustomerGuardOverride)
      .compile();

    await seedTestDatabase(moduleFixture);

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

  it('/movies/watch/1 (POST)', () => {
    return request(app.getHttpServer()).post('/movies/watch/1').expect(200);
  });
});
