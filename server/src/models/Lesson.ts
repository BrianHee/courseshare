import mongoose, { Schema } from 'mongoose';
import ILesson from '../interfaces/lesson';

const LessonSchema: Schema = new Schema(
	{
		course: { type: String, required: true },
		title: { type: String, required: true },
		content: { type: String }
	},
	{
		timestamps: true
	}
);

export default mongoose.model<ILesson>('Lesson', LessonSchema);
