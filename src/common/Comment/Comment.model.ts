import { Document, Schema, Model, model } from "mongoose";

export interface IComment extends Document {};
const commentSchema: Schema = new Schema({
  text: String,
  authorId: Schema.Types.ObjectId,
}, {
  timestamps: true,
});

const Comment: Model<IComment> = model('comment', commentSchema);

export {
  Comment,
};
