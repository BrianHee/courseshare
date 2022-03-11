import validator from 'validator';

import valText from './validText';
import IRegistration from '../interfaces/registration';

export default function valateRegisterInput(data: IRegistration) {
	let errors = {} as any;

	data.firstName = valText(data.firstName) ? data.firstName : '';
	data.lastName = valText(data.lastName) ? data.lastName : '';
	data.email = valText(data.email) ? data.email : '';
	data.password = valText(data.password) ? data.password : '';
	data.password2 = valText(data.password2) ? data.password2 : '';

	if (!validator.isLength(data.firstName, { min: 2, max: 20 })) {
		errors.firstName = 'Please enter a valid first name';
	}

	if (validator.isEmpty(data.firstName)) {
		errors.firstName = 'First name field is required';
	}

	if (!validator.isLength(data.lastName, { min: 2, max: 20 })) {
		errors.lastName = 'Please enter a valid last name';
	}

	if (validator.isEmpty(data.lastName)) {
		errors.lastName = 'Last name field is required';
	}

	if (validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}

	if (!validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	if (validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	if (!validator.isLength(data.password, { min: 6, max: 20 })) {
		errors.password = 'Password must be at least 6 characters';
	}

	if (validator.isEmpty(data.password2)) {
		errors.password2 = 'Confirm password field is required';
	}

	if (!validator.equals(data.password, data.password2)) {
		errors.password2 = 'Passwords must match';
	}

	return {
		errors,
		isValid: Object.keys(errors).length === 0
	};
}
