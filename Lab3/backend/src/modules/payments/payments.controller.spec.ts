import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payments.controller';
import { PaymentService } from './payments.service';
import { PAYMENT_STATUSES } from './payment.constants';

const mockPayment = {
  id: '123',
  job: '456',
  user: '789',
  amount: 100.0,
  status: PAYMENT_STATUSES.SUCCESS,
  paymentDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('PaymentController', () => {
  let controller: PaymentController;
  let paymentService: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockPayment),
            findAll: jest.fn().mockResolvedValue([mockPayment]),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    paymentService = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call PaymentService.create and return the created payment', async () => {
      const dto = {
        job: '456',
        user: '789',
        amount: 100.0,
        status: PAYMENT_STATUSES.SUCCESS,
        paymentDate: new Date(),
      };
      const result = await controller.create(dto);

      expect(paymentService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockPayment);
    });
  });

  describe('findAll', () => {
    it('should call PaymentService.findAll and return an array of payments', async () => {
      const result = await controller.findAll();

      expect(paymentService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockPayment]);
    });
  });
});
