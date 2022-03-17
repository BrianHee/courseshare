import mongoose, { Schema } from 'mongoose';
import IChapter from '../interfaces/chapter';

const ChapterSchema: Schema = new Schema(
	{
		course: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Coursex',
			required: true
		},
		title: { type: String, required: true },
		pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
		pagecount: { type: Number }
	},
	{
		timestamps: true
	}
);

export default mongoose.model<IChapter>('Chapter', ChapterSchema);
