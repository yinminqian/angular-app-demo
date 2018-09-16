import {Injectable} from '@angular/core';
import {Hero} from './hero'
import {Observable, of} from 'rxjs'
import {MessageService} from './message.service'

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private http: HttpClient, private messageService: MessageService) {

  }


  private heroesUrl = `api/heroes`


  //返回一个Observable数据
  getHeroes(): Observable<Hero[]> {
    this.messageService.add("获取数据成功");
    // return of(HEROES);
    //发起请求,返回一个可观察的数据对象
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.log("我是可观察对象的log")),
      catchError(this.handleError("error", []))
    )
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  log(message: string): void {
    this.messageService.add(message)
  }


  //更新一个英雄
  updateHero(hero: Hero): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`更新了值,${hero.id}`)),
        catchError(this.handleError<any>("update"))
      )
  }


  //获取全部英雄
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    // this.messageService.add(`获取了${id}的数据`)
    // return of(HEROES.find(res => res.id === id))
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`通过可观察对象获取了${id}的值`)),
      catchError(this.handleError<Hero>("获取单个数据的错误"))
    )
  }


  //增加一个英雄
  addHero(data: Hero): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    console.log('data111', data);
    return this.http.post<Hero>(this.heroesUrl, data, httpOptions).pipe(
      tap((hero: Hero) => this.log(`添加了一个英雄`)),
      catchError(this.handleError<Hero>("addHero")),
    )
  }


  //删除一个英雄
  deleteHero(hero: Hero | number): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const id = typeof hero === "number" ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`删除id为${id}的值`)),
      catchError(this.handleError<Hero>("删除错误"))
    )
  }

//  搜索一个英雄

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }


}
