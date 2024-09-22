import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { unlink } from 'node:fs/promises';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ManagerGuard } from '../src/auth/manager.guard';
import { ManagerGuardOverride, TestingDatabase } from './testing-utils';
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let movieRepo;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestingDatabase /* Must come before AppModule in order to use test.db */, AppModule],
    })
      .overrideGuard(ManagerGuard)
      .useValue(ManagerGuardOverride)
      .compile();

    app = moduleFixture.createNestApplication();

    movieRepo = moduleFixture.get('MovieRepository');

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  // Movie add/remove/update operations
  it('/movies (POST)', () => {
    return request(app.getHttpServer()).post('/movies').send({ name: 'Test Movie', ageRestriction: 0 }).expect(201);
  });

  it('/movies (DELETE)', () => {
    return request(app.getHttpServer()).delete('/movies').send({ id: 1 }).expect(204);
  });

  it('/movies (PATCH)', () => {
    return request(app.getHttpServer()).patch('/movies').send({ id: 1, name: 'Test 2' }).expect(200);
  });
});
