import { Test, TestingModule } from '@nestjs/testing';
import { ReservaLibrosController } from './reserva-libros.controller';

describe('ReservaLibrosController', () => {
  let controller: ReservaLibrosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservaLibrosController],
    }).compile();

    controller = module.get<ReservaLibrosController>(ReservaLibrosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
