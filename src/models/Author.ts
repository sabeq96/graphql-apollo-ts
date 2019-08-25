import { Model, RelationMappings } from 'objection';
import { Comment } from './Comment';

class Author extends Model {
  static tableName = 'authors';

  readonly id!: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  
  static relationMappings: RelationMappings = {
    comments: {
      relation: Model.HasManyRelation,
      modelClass: Comment,
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
  Author,
};
