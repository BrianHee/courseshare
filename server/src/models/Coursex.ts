import mongoose, { Schema } from 'mongoose';
import ICoursex from '../interfaces/coursex';

const CoursexSchema: Schema = new Schema(
	{
		title: { type: String, required: true },
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		description: { type: String, required: true },
		picture: { type: String },
		chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
		chaptercount: { type: Number }
	},
	{
		timestamps: true
	}
);

export default mongoose.model<ICoursex>('Coursex', CoursexSchema);
