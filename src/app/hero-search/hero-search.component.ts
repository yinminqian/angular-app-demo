import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Hero} from '../hero'
import {HeroService} from "../hero.service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>

  private searchYerms = new Subject<String>()

  constructor(private heroservice: HeroService) {

  }

  ngOnInit() {
    this.heroes$ = this.searchYerms.pipe(
      //延迟300毫秒
      debounceTime(300),
      //确保和上一次的值不同才会进行下次请求
      distinctUntilChanged(),

      //只会的返回最后一次http请求,之前的还未返回值的请求将被废弃
      switchMap((data: string) => this.heroservice.searchHeroes(data))
    )
  }


  search(data: string): void {
    //next方法,想这个observalble数据推送一些新值
    this.searchYerms.next(data)
    console.log('this.searchYerms', this.searchYerms);
  }
}
