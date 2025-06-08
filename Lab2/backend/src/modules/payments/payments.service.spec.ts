import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentService } from './payments.service';
import { Payment } from './payment.entity';
import { PAYMENT_STATUSES } from './payment.constants';

const mockPayment = {
  _id: '640c14e5b5f4ee1234567890',
  job: '640c14e5b5f4ee1234567891',
  user: '640c14e5b5f4ee1234567892',
  amount: 100.0,
  status: PAYMENT_STATUSES.SUCCESS,
  createdAt: new Date(),
  updatedAt: new Date(),
  save: jest.fn().mockResolvedValue(this),
};

const mockPaymentModel = {
  create: jest.fn().mockResolvedValue(mockPayment),
  find: jest.fn().mockReturnValue({
    populate: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockPayment]),
    }),
  }),
  save: jest.fn(),
};

describe('PaymentService', () => {
  let service: PaymentService;
  let model: Model<Payment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: getModelToken(Payment.name),
          useValue: mockPaymentModel,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    model = module.get<Model<Payment>>(getModelToken(Payment.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new payment', async () => {
      const paymentDto = {
        job: '640c14e5b5f4ee1234567891',
        user: '640c14e5b5f4ee1234567892',
        amount: 100.0,
        status: PAYMENT_STATUSES.SUCCESS,
      };
      const result = await service.create(paymentDto);

      expect(mockPaymentModel.create).toHaveBeenCalledWith(paymentDto);
      expect(result).toEqual(mockPayment);
    });
  });

  describe('findAll', () => {
    it('should return an array of payments', async () => {
      const result = await service.findAll();

      expect(mockPaymentModel.find).toHaveBeenCalled();
      expect(result).toEqual([mockPayment]);
    });
  });
});
