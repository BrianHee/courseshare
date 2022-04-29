import RouteInterface from '../interfaces/routes';
import LoginPage from '../pages/login';
import EditPage from '../pages/edit';
import CoursePage from '../pages/course';
import LandingPage from '../pages/landing';
import RegisterPage from '../pages/register';
import HomePage from '../pages/home';
import ErrorPage from '../pages/error';
import CreatePage from '../pages/create';
import GuestPage from '../pages/guest';

const authRoutes: RouteInterface[] = [
	{
		path: '/login',
		name: 'Login',
		auth: false,
		component: LoginPage
	},
	{
		path: '/register',
		name: 'Register',
		auth: false,
		component: RegisterPage
	},
	{
		path: '/guest',
		name: 'Guest',
		auth: false,
		component: GuestPage
	}
];

const courseRoutes: RouteInterface[] = [
	{
		path: '/edit/:courseID',
		name: 'Edit',
		auth: true,
		component: EditPage
	},
	{
		path: '/edit/:courseID/:lessonID',
		name: 'Edit',
		auth: true,
		component: EditPage
	},
	{
		path: '/home',
		name: 'Course',
		auth: true,
		component: HomePage
	},
	{
		path: '/create',
		name: 'Create',
		auth: true,
		component: CreatePage
	}
];

const mainRoutes: RouteInterface[] = [
	{
		path: '/',
		name: 'Landing',
		auth: false,
		component: LandingPage
	},
	{
		path: '/course/:courseID',
		name: 'Course',
		auth: false,
		component: CoursePage
	},
	{
		path: '/course/:courseID/:lessonID',
		name: 'Course',
		auth: false,
		component: CoursePage
	}
];

const errorRoutes: RouteInterface[] = [
	{
		path: '*',
		name: 'Error',
		auth: false,
		component: ErrorPage
	}
];

const routes: RouteInterface[] = [...authRoutes, ...courseRoutes, ...mainRoutes, ...errorRoutes];

export default routes;
