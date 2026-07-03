import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './create-customer.dto';
import { Customer } from './customer.entity';

/**
 * Customer Controller
 * Handles all HTTP requests related to customers
 * Routes are prefixed with /customers
 */
@Controller('customers')
export class CustomerController {
  // Inject the CustomerService via constructor
  constructor(private readonly customerService: CustomerService) {}

  /**
   * POST /customers
   * Create a new customer
   * @example
   * POST /customers
   * {
   *   "name": "Chukwu Obi",
   *   "studentId": "STU001",
   *   "class": "JSS1",
   *   "expectedAmount": 50000
   * }
   */
  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    // For now, hardcoding businessId. Later: extract from auth context
    const businessId = 'business_demo';
    return this.customerService.create(businessId, createCustomerDto);
  }

  /**
   * GET /customers
   * Get all customers for the business
   */
  @Get()
  async findAll(): Promise<Customer[]> {
    const businessId = 'business_demo';
    return this.customerService.findByBusiness(businessId);
  }

  /**
   * GET /customers/:id
   * Get a specific customer by ID
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer | null> {
    const customer = await this.customerService.findOne(id);
    if (!customer) {
      throw new HttpException(
        `Customer with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return customer;
  }

  /**
   * PUT /customers/:id
   * Update a customer
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateCustomerDto>,
  ): Promise<Customer> {
    return this.customerService.update(id, updateData);
  }

  /**
   * DELETE /customers/:id
   * Delete a customer
   */
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    const success = await this.customerService.remove(id);
    if (!success) {
      throw new HttpException(
        `Customer with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return { success };
  }

  /**
   * GET /customers/by-student/:studentId
   * Find customer by school-specific student ID
   */
  @Get('by-student/:studentId')
  async findByStudentId(
    @Param('studentId') studentId: string,
  ): Promise<Customer | null> {
    const businessId = 'business_demo';
    const customer = await this.customerService.findByStudentId(
      businessId,
      studentId,
    );
    if (!customer) {
      throw new HttpException(
        `Customer with studentId ${studentId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return customer;
  }
}
