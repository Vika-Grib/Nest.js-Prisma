// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersService } from './users.service';

// describe('UserService', () => {
//   let service: UsersService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [UsersService],
//     }).compile();

//     service = module.get<UsersService>(UsersService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });


import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  user: {
    findMany: jest.fn(() => Promise.resolve([
      { id: 1, role: 'User Role', email: 'userone@example.com' },
      { id: 2, role: 'User Two', email: 'usertwo@example.com' }
    ])),
    findUnique: jest.fn().mockImplementation((opts) => Promise.resolve({
      id: opts.where?.id,
      role: 'User Role',
      email: 'userone@example.com'
    })),
  },
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService }, 
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return all users', async () => {
    await expect(service.findAll()).resolves.toEqual([
      { id: 1, role: 'User Role', email: 'userone@example.com' },
      { id: 2, role: 'User Two', email: 'usertwo@example.com' }
    ]);
    expect(mockPrismaService.user.findMany).toHaveBeenCalled();
  });

  it('should return a specific user by id', async () => {
    const userId = 1;
    await expect(service.findOne(userId)).resolves.toEqual({
      id: userId,
      role: 'User Role',
      email: 'userone@example.com'
    });
    expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId },
      select: { id: true, role: true, email: true }  
    });
  });
});
