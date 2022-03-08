import { Document } from 'mongoose';

export default interface IUser extends Document {
	id: string;
	email: string;
}
