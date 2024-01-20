import { Controller, Get, HostParam } from '@nestjs/common';

@Controller({ host: ':account.example.com' })
export class HostController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    console.log('getInfo  :', account); //account
    return account;
  }
}
