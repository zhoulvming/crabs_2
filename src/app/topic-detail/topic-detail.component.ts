import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Topic } from '../shared/models/topic';
import { AppState } from '../shared/services/app.service';

@Component({
  selector: 'topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {

  currentTopic: Topic;

  constructor(
    public appState: AppState, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentTopic = this.appState.state['currentTopic'];
  }

  gotoBack() {
    window.history.back();
  }

}
