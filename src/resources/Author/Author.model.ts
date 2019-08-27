import { Document, Schema, Model, model } from "mongoose";
import { Comment } from '../Comment/Comment.model';

export interface IAuthor extends Document {
  name: String
};

const authorSchema: Schema = new Schema({
  name: String,
}, {
  timestamps: true,
});

authorSchema.post('remove', function (doc) {
  Comment.deleteMany({ authorId: doc.id }).exec()
})

const Author: Model<IAuthor> = model('author', authorSchema);

export {
  Author,
};
