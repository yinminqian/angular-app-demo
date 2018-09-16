import {Component, OnInit, Input} from '@angular/core';
import {Hero} from '../hero'
//保存了路由信息
import {ActivatedRoute} from "@angular/router";
//获取数据的服务
import {HeroService} from "../hero.service";
//angular服务,返回按钮使用
import {Location} from "@angular/common";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location,) {

  }

  //声明一个带有@Input装饰器的hero属性
  hero: Hero

  ngOnInit() {
    this.getHero();
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe(_ => this.goBack())
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    console.log('this.route.snapshot', this.route.snapshot);
    console.log('id', id);
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }
}
