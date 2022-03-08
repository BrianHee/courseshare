import mongoose, { Schema } from 'mongoose';
import ICourse from '../interfaces/course';

const CourseSchema: Schema = new Schema(
	{
		title: { type: String, unique: true },
		author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		content: { type: String },
		headline: { type: String },
		picture: { type: String }
	},
	{
		timestamps: true
	}
);

export default mongoose.model<ICourse>('Course', CourseSchema);
