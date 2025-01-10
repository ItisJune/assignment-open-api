import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly baseUrl = 'https://timeapi.io/api/Time/current';

  async getCurrentTime(timezone: string = 'Europe/London') {
    try {
      const response = await axios.get(`${this.baseUrl}/zone`, {
        params: {
          timeZone: timezone
        }
      });
      
      return {
        success: true,
        data: {
          datetime: response.data.dateTime,
          timezone: timezone,
          day_of_week: new Date(response.data.dateTime).getDay(),
          utc_offset: response.data.timeZone
        }
      };
    } catch (error) {
      console.error('Time fetch error:', error.message);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Failed to fetch current time',
        message: error.response?.data?.message || error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTimeZones() {
    try {
      const response = await axios.get('https://timeapi.io/api/TimeZone/AvailableTimeZones');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Timezone fetch error:', error.message);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Failed to fetch timezones',
        message: error.response?.data?.message || error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
