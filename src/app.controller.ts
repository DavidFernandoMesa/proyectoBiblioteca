import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApikeyGuard } from './auth/guards/apikey.guard';

@UseGuards(ApikeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('nuevo')
  newEndPoint() {
    return 'YO SOY NUEVO';
  }

  @Get('tasks')
  task() {
    return this.appService.getTaks();
  }
}
