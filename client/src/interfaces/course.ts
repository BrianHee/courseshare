import IUser from './user';

export default interface ICourse {
	_id: string;
	title: string;
	author: string | IUser;
	description: string;
	createdAt: string;
	updatedAt: string;
	image?: string;
}
