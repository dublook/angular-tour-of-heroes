import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { HeroViewService } from './hero-view.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  selectedHeroId$ = this.heroViewService.selectedHeroId$;

  selectedHero$ = this.heroViewService.selectedHero$.pipe(
    map((hero) => hero ? hero : new Hero()), // 指定なしの場合は、新規作成のための空のHeroを作る
  );

  constructor(
    private heroApi: HeroService,
    private heroViewService: HeroViewService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.navigated = true;
      this.heroViewService.selectHero(+id)
    } else {
      this.navigated = false;
      this.heroViewService.selectHero(null)
    }
  }

  save(hero: Hero): void {
    this.heroApi.save(hero)
      .subscribe(
        (savedHero) => {
          this.heroViewService.selectHero(savedHero ? savedHero.id : null);
          this.goBack(savedHero);
        },
        error => (this.error = error)  // TODO: Display error message
      );
  }

  goBack(savedHero: Hero = null): void {
    this.close.emit(savedHero);
    if (this.navigated) {
      window.history.back();
    }
  }
}
