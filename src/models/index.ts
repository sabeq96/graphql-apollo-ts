import db from '../client';

class Author extends db.Model<Author> {
  get tableName(): string { return 'authors' };
  public comments() {
    return this.hasMany(Comment)
  }
};

class Comment extends db.Model<Comment> {
  get tableName(): string { return 'comments' };
  public author() {
    return this.belongsTo(Author)
  }
};

export {
  Author,
  Comment,
};
