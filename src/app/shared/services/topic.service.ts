import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Topic } from '../models/topic';
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
            content: item.content_rendered
          });
        });

        return topics;
      })
      .catch(this.handleError)
  }

}