import { NgModule } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';
import { HomeComponent } from './home';
import { TopicListComponent } from './topic-list';
import { TopicDetailComponent } from './topic-detail';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'topics/:channel/:tab', component: TopicListComponent },
    { path: 'topic/:id', component: TopicDetailComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [],
})
export class AppRoutingModule { }
