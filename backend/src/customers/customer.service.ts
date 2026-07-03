import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './create-customer.dto';

/**
 * Customer Service
 * Contains all business logic for customers
 * Uses TypeORM repository for database access
 */
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  /**
   * Create a new customer
   * @param businessId - The business/school ID
   * @param createCustomerDto - Customer data
   * @returns Created customer
   */
  async create(
    businessId: string,
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const customer = this.customersRepository.create({
      businessId,
      ...createCustomerDto,
      status: 'active',
    });

    return this.customersRepository.save(customer);
  }

  /**
   * Get all customers for a business
   */
  async findByBusiness(businessId: string): Promise<Customer[]> {
    return this.customersRepository.find({
      where: { businessId },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get a specific customer by ID
   */
  async findOne(id: string): Promise<Customer | null> {
    return this.customersRepository.findOne({
      where: { id },
    });
  }

  /**
   * Update a customer
   */
  async update(
    id: string,
    updateData: Partial<Customer>,
  ): Promise<Customer> {
    const customer = await this.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    // Prevent updating these fields
    delete updateData.id;
    delete updateData.businessId;
    delete updateData.createdAt;

    await this.customersRepository.update(id, updateData);
    return this.findOne(id) as Promise<Customer>;
  }

  /**
   * Delete a customer
   */
  async remove(id: string): Promise<boolean> {
    const result = await this.customersRepository.delete(id);
    return result.affected! > 0;
  }

  /**
   * Get customer by school identifier
   */
  async findByStudentId(
    businessId: string,
    studentId: string,
  ): Promise<Customer | null> {
    return this.customersRepository.findOne({
      where: { businessId, studentId },
    });
  }

  /**
   * Get customers by status
   */
  async findByStatus(
    businessId: string,
    status: 'active' | 'inactive' | 'suspended',
  ): Promise<Customer[]> {
    return this.customersRepository.find({
      where: { businessId, status },
      order: { createdAt: 'DESC' },
    });
  }
}
