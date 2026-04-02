import { AppDataSource } from "../config/data-source";
import { Post } from "../entities/Post";
import { User } from "../entities/User";

const postRepo = AppDataSource.getRepository(Post);
const userRepo = AppDataSource.getRepository(User);

export class PostService {

  async create(userId: number, title: string, content: string) {

    const user = await userRepo.findOneBy({ id: userId });

    if (!user) throw new Error("User not found");

    const post = postRepo.create({
      title,
      content,
      user,
    });

    return postRepo.save(post);
  }

  async getAll() {
    return postRepo.find({
      relations: ["user"]
    });
  }

  async getOne(id: number) {

    const post = await postRepo.findOne({
      where: { id },
      relations: ["user"]
    });

    if (!post) throw new Error("Post not found");

    return post;
  }

  async update(id: number, title: string, content: string) {

    const post = await this.getOne(id);

    post.title = title;
    post.content = content;

    return postRepo.save(post);
  }

  async delete(id: number) {

    const post = await this.getOne(id);

    await postRepo.remove(post);

    return true;
  }

}