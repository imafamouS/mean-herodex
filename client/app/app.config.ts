import { environment } from '../environments/environment';
const BASE_URL: string = environment.base_api_url;

export const API = {
	auth: {
		login: BASE_URL + "/auth/login",
		register: BASE_URL + "/auth/register"
	},
	user_url: BASE_URL + "/users",
	hero_url: BASE_URL + "/heroes"
};

export const DEFAULT_IMAGE_HERO = 'assets/img/default-hero.jpg';
