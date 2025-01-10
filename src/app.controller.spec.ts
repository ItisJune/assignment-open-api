import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('time', () => {
    it('should return current time', async () => {
      const result = { 
        success: true, 
        data: { 
          datetime: '2024-03-26T12:00:00Z',
          timezone: 'Europe/London',
          day_of_week: 2,
          utc_offset: '+00:00'
        } 
      };
      jest.spyOn(appService, 'getCurrentTime').mockResolvedValue(result);
      expect(await appController.getCurrentTime('Europe/London')).toBe(result);
    });

    it('should return timezones', async () => {
      const result = { success: true, data: ['Europe/London', 'America/New_York'] };
      jest.spyOn(appService, 'getTimeZones').mockResolvedValue(result);
      expect(await appController.getTimeZones()).toBe(result);
    });
  });
});
