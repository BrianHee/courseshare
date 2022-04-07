import mongoose, { Schema } from 'mongoose';
import ICourse from '../interfaces/course';

const CourseSchema: Schema = new Schema(
	{
		title: { type: String, required: true },
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		description: { type: String, required: true },
		lessons: [
			{
				lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
				lessonTitle: { type: String },
				_id: false
			}
		],
		lessoncount: { type: Number },
		picture: { type: String }
	},
	{
		timestamps: true
	}
);

export default mongoose.model<ICourse>('Course', CourseSchema);
