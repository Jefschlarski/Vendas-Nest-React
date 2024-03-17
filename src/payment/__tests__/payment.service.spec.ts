import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../payment.service';
import { Payment } from '../entities/payment.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PaymentService', () => {
  let service: PaymentService;
  let paymentRepository: Repository<Payment>;

  const paymentMock = {
    id: 1,
    userId: 1,
    status: 'paid',
    paymentMethod: 'credit_card',
    paymentDate: new Date(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
      PaymentService,
      {
        provide: getRepositoryToken(Payment),
        useValue: {
          findOne: jest.fn().mockResolvedValue(paymentMock),
          save: jest.fn().mockResolvedValue(paymentMock),
          update: jest.fn().mockResolvedValue({affected: 1}),
        },
      }
    ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    paymentRepository = module.get<Repository<Payment>>(getRepositoryToken(Payment));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(paymentRepository).toBeDefined();
  });
});
