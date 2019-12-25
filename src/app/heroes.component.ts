import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { HeroViewService } from './hero-view.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  addingHero = false;
  error: any;
  showNgFor = false;

  heroes$ = this.heroViewService.heroes$;

  selectedHeroId$ = this.heroViewService.selectedHeroId$;

  selectedHero$ = this.heroViewService.selectedHero$;

  constructor(
    private heroApi: HeroService,
    private heroViewService: HeroViewService,
  ) {}

  ngOnInit(): void {
    // 初期化処理を呼ばない!
  }

  addHero(): void {
    this.heroViewService.selectHero(null);
    this.addingHero = true;
  }

  closeDetail(savedHero: Hero): void {
    this.addingHero = false;
    if (savedHero) {
      this.heroViewService.refreshHeroes();
    }
  }

  deleteHero(hero: Hero, event: any): void {
    console.log('deleteHero', hero)
    event.stopPropagation();
    this.heroApi.delete(hero)
      .subscribe(
        () => this.heroViewService.refreshHeroes(),
        (error) => this.error = error,
      )
  }

  onSelect(hero: Hero): void {
    this.heroViewService.selectHero(hero.id);
    this.addingHero = false;
  }

}
