import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AuthModule } from '../src/application/auth/auth.module';
import { setupApp } from '../src/setupApp';

describe('AuthController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    setupApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('username validation', () => {
    const endpoints = ['/auth/token/register', '/auth/session/register'];

    it.each([
      ['validUser', 'validUser'],
      ['validUser123', 'validUser123'],
    ])('should return 201 for valid %s', async (_, username) => {
      await Promise.all(
        endpoints.map((endpoint) =>
          request(app.getHttpServer())
            .post(endpoint)
            .send({ username, password: 'Valid1!' })
            .expect(201),
        ),
      );
    });

    it.each([
      ['empty username', ''],
      ['too short', 'ab'],
      ['undefined username', undefined],
      ['null username', null],
    ])('should return 400 for %s', async (_, username) => {
      await Promise.all(
        endpoints.map((endpoint) =>
          request(app.getHttpServer())
            .post(endpoint)
            .send({ username, password: 'Valid1!' })
            .expect(400),
        ),
      );
    });
  });

  describe('password validation', () => {
    const endpoints = ['/auth/token/register', '/auth/session/register'];

    it.each([
      ['empty password', ''],
      ['too short', 'ab4'],
      ['only letters', 'abcdefe'],
    ])('should return 400 for %s', async (_, password) => {
      await Promise.all(
        endpoints.map((endpoint) =>
          request(app.getHttpServer())
            .post(endpoint)
            .send({ username: 'validUser', password })
            .expect(400),
        ),
      );
    });

    it.each([
      ['exactly 4 chars', 'ab4!'],
      ['includes number', 'veryStrongPassword1'],
      ['includes special char', 'StrongPass!'],
    ])('should return 201 for %s', async (_, password) => {
      await Promise.all(
        endpoints.map((endpoint) =>
          request(app.getHttpServer())
            .post(endpoint)
            .send({ username: 'validUser', password })
            .expect(201),
        ),
      );
    });
  });
});
