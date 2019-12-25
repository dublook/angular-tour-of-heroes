import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroViewService } from './hero-view.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes$ = this.heroViewService.heroes$.pipe(
    map((heroes) => [...heroes].reverse().slice(0, 4))
  );

  constructor(
    private router: Router,
    private heroViewService: HeroViewService,
  ) {
  }

  ngOnInit(): void {
    // 初期化処理を呼ばない!
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
