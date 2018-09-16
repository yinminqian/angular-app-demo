import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import {HeroesComponent} from "./heroes/heroes.component";
import {DashboardComponent} from './dashboard/dashboard.component'
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";


const routes: Routes = [
  {path: 'heroes', component: HeroesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent},
  //默认路由
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
  //初始化路由
  imports: [RouterModule.forRoot(routes)],
  //导出路由
  exports: [RouterModule]
})
export class AppRoutingModule {
}
