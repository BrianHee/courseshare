export default interface RouteInterface {
	path: string;
	name: string;
	auth: boolean;
	component: any;
	props?: any;
}
