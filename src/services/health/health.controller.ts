import { Controller, Get } from '@nestjs/common';

@Controller('/health')
export class HelathController {
  @Get('')
  getHealth(): object {
    const isLive = true;

    return { isLive: isLive };
  }
}
