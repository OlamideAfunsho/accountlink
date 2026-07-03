import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Customer Entity
 * Represents a student or customer in the system
 */
@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  businessId!: string; // Which school/business this customer belongs to

  @Column()
  name!: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  studentId?: string; // School-specific identifier (e.g., registration number)

  @Column({ nullable: true })
  class?: string; // For schools: which class/grade

  @Column({ nullable: true, type: 'integer' })
  expectedAmount?: number; // Expected fee amount in kobo

  @Column({ nullable: true })
  virtualAccountNumber?: string; // Nomba virtual account number

  @Column({ default: 'active' })
  status!: 'active' | 'inactive' | 'suspended'; // Customer status

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
