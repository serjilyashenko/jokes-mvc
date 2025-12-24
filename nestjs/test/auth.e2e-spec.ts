import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AuthModule } from '../src/domain/auth/auth.module';

describe('AuthController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('username validation', () => {
    it.each([
      ['empty username', ''],
      ['too short', 'ab'],
      ['undefined username', undefined],
      ['null username', null],
    ])('should return 400 for %s', async (_, username) => {
      await request(app.getHttpServer())
        .post('/auth')
        .send({ username, password: 'Valid1!' })
        .expect(400);
    });
  });

  describe('password validation', () => {
    it.each([
      ['empty password', ''],
      ['too short', 'ab4'],
      ['only letters', 'abcdefe'],
    ])('should return 400 for %s', async (_, password) => {
      await request(app.getHttpServer())
        .post('/auth')
        .send({ username: 'validUser', password })
        .expect(400);
    });

    it.each([
      ['exactly 4 chars', 'ab4!'],
      ['includes number', 'veryStrongPassword1'],
      ['includes special char', 'StrongPass!'],
    ])('should return 200 for %s', async (_, password) => {
      await request(app.getHttpServer())
        .post('/auth')
        .send({ username: 'validUser', password })
        .expect(200);
    });
  });
});
