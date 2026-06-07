import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GreetingModule } from '../src/application/greeting/greeting.module';
import { setupApp } from '../src/setupApp';

describe('GreetingController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GreetingModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    setupApp(app);
    await app.init();
  });

  afterEach(async () => {
    await app?.close();
  });

  it('/greeting?name=Bob should render greeting page', () => {
    return request(app.getHttpServer())
      .get('/greeting?name=Bob')
      .expect(200)
      .expect((res) => {
        expect(res.text).toContain('Hello, Bob!');
      });
  });
});
