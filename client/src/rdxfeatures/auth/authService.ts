import axios from 'axios';

const API_URL = '/api/users/';

// Register user
// userData type object?? recheck once soldified
const register = async (userData: object) => {
	const response = await axios.post(API_URL, userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};
