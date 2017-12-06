export class HeroModel {
	_id: string;
	name: string;
	universe: string;
	img: string;
	story: string;

	constructor({id, name, universe, img, story}){
		this._id = id;
		this.name = name;
		this.universe = universe;
		this.img = img;
		this.story = story;
	}
}