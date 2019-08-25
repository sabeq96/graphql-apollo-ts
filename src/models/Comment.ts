import { Model, RelationMappings } from 'objection';
import { Author } from './Author';

class Comment extends Model {
  static tableName = 'comments';

  readonly id!: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  author: Author;

  static relationMappings: RelationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: Author,
      join: {
        to: 'authors.id',
        from: 'comments.author_id',
      }
    }
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}

export {
  Comment,
};
