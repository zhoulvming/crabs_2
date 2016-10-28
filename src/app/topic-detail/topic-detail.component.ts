import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Topic } from '../shared/models/topic';
import { Reply } from '../shared/models/reply';
import { AppState } from '../shared/services/app.service';

import { TopicReplyComponent } from '../topic-reply';
import { TopicService } from '../shared/services/topic.service';

@Component({
  selector: 'topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [
    TopicService
  ],
})
export class TopicDetailComponent implements OnInit {

  currentTopic: Topic;
  public replies: Reply[];

  constructor(
    public appState: AppState, 
    private topicService: TopicService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentTopic = this.appState.state['currentTopic'];
    if (this.currentTopic) {
      this.topicService.getV2exReplyData(this.currentTopic.id)
        .then(replies => {
          this.replies = replies;
        });
    }
  }

  gotoBack() {
    window.history.back();
  }

}
