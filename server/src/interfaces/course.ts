import IUser from './user';

export default interface ICourse {
	title: string;
	author: IUser;
	description: string;
	lessons: object[];
	lessoncount: number;
	image?: string;
}
