import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('time')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('current')
  async getCurrentTime(@Query('timezone') timezone: string = 'Europe/London') {
    if (!timezone) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Missing required parameter',
        message: 'Timezone is required'
      }, HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.appService.getCurrentTime(timezone);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Current time fetch failed',
        message: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('timezones')
  async getTimeZones() {
    try {
      return await this.appService.getTimeZones();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Timezone fetch failed',
        message: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
