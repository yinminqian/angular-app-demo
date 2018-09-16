import {Component, OnInit} from '@angular/core';
import {HeroService} from "../hero.service";
import {Hero} from "../hero";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private heroService: HeroService) {
  }


  heroes: Hero[] = [];

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    // console.log('this.heroService.getHeroes()',this.heroService.getHeroes());
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5))
  }

}
