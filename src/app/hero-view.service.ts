import { Injectable } from '@angular/core';
import { HeroService } from './hero.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Hero } from './hero';
import { exhaustMap, tap, map, distinctUntilChanged, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroViewService {

  private refreshHeroes$ = new BehaviorSubject(null);

  readonly heroes$: Observable<Hero[]> = this.refreshHeroes$.pipe(
    exhaustMap(() => this.heroApi.getHeroes()),
    tap((heroes) => {
      console.log(`${heroes.length} heroes are loaded.`)
    }),
    shareReplay(),
  );

  private selectedHeroId = new BehaviorSubject<number>(null);

  readonly selectedHeroId$ = this.selectedHeroId.asObservable().pipe(
    distinctUntilChanged(),
  );

  readonly selectedHero$ = combineLatest(
    this.heroes$,
    this.selectedHeroId$,
  ).pipe(
    map(([heroes, selectedHeroId]) => {
      console.log('selectedHeroId', selectedHeroId);
      return heroes.find((h) => h.id === selectedHeroId);
    }),
    shareReplay(),
  );

  constructor(
    private heroApi: HeroService,
  ) { }

  selectHero(id: number) {
    this.selectedHeroId.next(id);
  }

  refreshHeroes() {
    this.refreshHeroes$.next(null);
  }
}
