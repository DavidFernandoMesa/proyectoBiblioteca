import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApikeyGuard } from './auth/guards/apikey.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(ApikeyGuard)
  @Get()
  newEndPoint() {
    return 'YO SOY NUEVO';
  }

  @Get('tasks')
  task() {
    return this.appService.getTaks();
  }
}
