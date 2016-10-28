import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Topic } from '../models/topic';
import { Reply } from '../models/reply';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TopicService {
  constructor(public http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An service error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getTopics(): Promise<Topic[]> {
    return this.http.get('/v2ex_latest')
      .toPromise()
      .then(response => {
        let topics: Topic[] = [];
        response.json().forEach(item => {
          topics.push({
            id: item.id,
            title: item.title,
            created: item.created,
            author_id: item.author_id,
            author_name: item.member.username,
            author_avatar_mini: item.member.avatar_mini,
            author_avatar_normal: item.member.avatar_normal,
            author_avatar_large: item.member.avatar_large,
            content: item.content_rendered,
            replies_count: item.replies
          });
        });

        return topics;
      })
      .catch(this.handleError)
  }

  getV2exReplyData(id): Promise<Reply[]> {
    return this.http.get('v2ex_reply?topic_id=' + id).toPromise()
      .then(response => {
        let replies: Reply[] = [];
        response.json().forEach(item => {
          replies.push({
            id: item.id,
            content: item.content_rendered,
            member: {
              id: item.member.id,
              username: item.member.username,
              avatar_mini: item.member.avatar_mini,
              avatar_normal: item.member.avatar_normal,
              avatar_large: item.member.avatar_large
            },
            created: item.created,
            last_modified: item.last_modified
          });
        });
        return replies;
      })
      .catch(this.handleError)
  }

}