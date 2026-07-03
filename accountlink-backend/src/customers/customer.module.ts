import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';

/**
 * Customer Module
 * Bundles all customer-related controllers and services
 * This module is then imported in AppModule
 */
@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService], // Export so other modules can use it
})
export class CustomerModule {}
