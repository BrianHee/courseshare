import mongoose, { Schema } from 'mongoose';
import ILesson from '../interfaces/lesson';

const LessonSchema: Schema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

export default mongoose.model<ILesson>('Lesson', LessonSchema);
