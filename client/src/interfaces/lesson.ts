import IUser from './user';

export default interface ILesson {
	_id: string;
	course: string;
	title: string;
	content: string;
}
