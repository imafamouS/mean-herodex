import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { HeroService } from '../../../services/hero.service';
import { HeroModel } from '../../../models/hero.model';


declare let $: any;
@Component({
	selector: 'app-hero-update',
	templateUrl: './hero-update.component.html',
	styleUrls: ['./hero-update.component.css']
})
export class HeroUpdateComponent implements OnInit {
	@Input('hero') hero;
	@Output('onUpdateHeroSuccessfully') onUpdateHeroSuccessfully: EventEmitter<HeroModel> = new EventEmitter<HeroModel>();

	heroForm: FormGroup;
	name: FormControl;

	universes = [
		{ value: 1, name: 'DC Comics' },
		{ value: 2, name: 'Marvel Comics' }
	];

	constructor(private formBuilder: FormBuilder,
		private router: Router,
		private heroService: HeroService,
		private toast: ToastrService) { }

	ngOnInit() {
		this.initForm();
	}

	public updateHero() {
		let heroModel: HeroModel = this.buildHeroModel();
		if (!heroModel.name) {
			this.toast.warning('', 'Name is required');
			return;
		}
		this.heroService.update(heroModel)
			.subscribe(
			result => {
				let isSuccess = result.status === 'success';

				if (isSuccess) {
					this.toast.success(`Updated hero successfully`);
					$('#updateHeroModal').modal('toggle');

					this.onUpdateHeroSuccessfully.emit(heroModel);
				}
			},
			error => {
				let message = 'Cannot update Hero! Please try later';

				this.toast.error('', message);
			});

		this.heroForm.reset();
	}

	private buildHeroModel() {
		return new HeroModel({
			id: this.hero._id,
			name: this.name.value,
			universe: this.heroForm.get('universe').value == 1 ? 'DC Comics' : 'Marvel Comics',
			img: this.heroForm.get('img').value || 'assets/img/default-hero.jpg',
			story: this.heroForm.get('story').value
		});
	}

	private initForm() {
		this.name = new FormControl(this.hero.name, [Validators.required]);

		this.heroForm = this.formBuilder.group({
			name: this.name,
			universe: [],
			img: [],
			story: []
		});
	}
}
