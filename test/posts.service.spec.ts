import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from '../src/posts/posts.service';
import { PrismaService } from '../src/prisma/prisma.service';

const mockPrismaService = {
  post: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should create a new post', async () => {
    const createPostDto = { title: 'New Post', content: 'Content of the new post' };
    const userId = 1; // Пример ID пользователя
    const result = { ...createPostDto, userId }; // Ожидаемый результат создания поста

    mockPrismaService.post.create.mockResolvedValue(result);

    expect(await service.create(createPostDto, userId)).toEqual(result);
    expect(mockPrismaService.post.create).toHaveBeenCalledWith({
      data: {
        ...createPostDto,
        userId,
      },
    }); 
  });
  it('should return a specific post by id', async () => {
    const postId = 1;
    const post = { id: postId, title: 'Test Post', content: 'Test content', userId: 1 };
    
    mockPrismaService.post.findUnique.mockResolvedValue(post);

    await expect(service.findOne(postId)).resolves.toEqual(post);
    expect(mockPrismaService.post.findUnique).toHaveBeenCalledWith({
      where: { id: postId },
      include: { user: true }  
    });
  });


});
