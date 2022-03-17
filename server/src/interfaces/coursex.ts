import IUser from './user';

export default interface ICoursex {
	title: string;
	author: IUser;
	description: string;
	picture?: string;
	chapters: Array<string>;
	chaptercount: number;
}
