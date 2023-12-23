import { UserInterface } from './user.interface';

export interface CommentInterface {
  id: string;
  comment: string;
  rating: number;
  user: UserInterface;
}
