import IUser from './user';

export default interface ICourse {
	_id: string;
	title: string;
	author: string | IUser;
	content: string;
	headline: string;
	picture?: string;
	createdAt: string;
	updatedAt: string;
}
