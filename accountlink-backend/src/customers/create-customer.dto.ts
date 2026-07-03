/**
 * Data Transfer Object (DTO) for creating a customer
 * DTOs define what data the API accepts and provides validation hints
 */
export class CreateCustomerDto {
  name!: string;
  email?: string;
  phone?: string;
  studentId?: string;
  class?: string;
  expectedAmount?: number;
}
