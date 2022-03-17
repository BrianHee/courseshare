import mongoose, { Schema } from 'mongoose';
import IPage from '../interfaces/page';

const PageSchema: Schema = new Schema(
	{
		chapter: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Chapter',
			required: true
		},
		title: { type: String, required: true },
		content: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

export default mongoose.model<IPage>('Page', PageSchema);
