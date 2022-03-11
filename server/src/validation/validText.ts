const validText = (text: string) => {
	return typeof text === 'string' && text.trim().length > 0;
};

export default validText;
