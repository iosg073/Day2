import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
 
  @Input() hero: Hero = { name: '' } as Hero;
  heroForm: FormGroup   = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if(id>0){
       /* Do not subscribe if there is no number provided */
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero.id > 0) {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
    }
    else {
      this.heroService.addHero(this.hero)
      .subscribe(() => this.goBack());

    }
  }
}
