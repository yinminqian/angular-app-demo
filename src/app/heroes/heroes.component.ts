import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero'
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {


  //服务注入
  constructor(private heroService: HeroService) {
  }

  hero: Hero = {
    id: 1,
    name: "王花花"
  }
  heroes: Hero[];

  getHeroes(): void {
    //在Observable数据的回调函数中赋值
    this.heroService.getHeroes().subscribe((heroes) => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero)
      })
  }


  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe()
  }
}
