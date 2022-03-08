export default interface IUser {
	data: {
		id: string;
		email: string;
	} | null;
	error: string | null;
	loading: boolean;
}

export const DEFAULT_USER: IUser = {
	data: {
		id: '',
		email: ''
	},
	error: '',
	loading: false
};

export const DEFAULT_TOKEN = '';
