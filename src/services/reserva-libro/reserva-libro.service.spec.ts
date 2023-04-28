import { Test, TestingModule } from '@nestjs/testing';
import { ReservaLibroService } from './reserva-libro.service';

describe('ReservaLibroService', () => {
  let service: ReservaLibroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservaLibroService],
    }).compile();

    service = module.get<ReservaLibroService>(ReservaLibroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
