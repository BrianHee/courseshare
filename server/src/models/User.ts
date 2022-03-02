import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		handle: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		date: {
			type: Date,
			default: Date.now
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model('User', UserSchema);
