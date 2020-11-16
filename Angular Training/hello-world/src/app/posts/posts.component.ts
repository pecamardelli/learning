import { Component, OnInit } from '@angular/core';
import { PostService } from './../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any;
  constructor(private service: PostService) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(
        posts => {
          this.posts = posts;
      });
  }

  createPost(input: HTMLInputElement) {
    const post = { title: input.value };
    input.value = '';

    this.service.create(JSON.stringify(post))
      .subscribe(
        newPost => {
          console.log(newPost);
          this.posts.splice(0,0,post);
      });
  }

  updatePost(post: any) {
    this.service.patch(post)
      .subscribe(
        updatedPost => {
          const index = this.posts.indexOf(post);
          this.posts.splice(index, 0, updatedPost);
      });
  }

  deletePost(post: any) {
    // Feeling optimistic...
    const index = this.posts.indexOf(post);
    const deleted = this.posts.splice(index, 1);

    this.service.delete(post.id)
      .subscribe(
        () => { },
        () => this.posts.splice(index,0,deleted[0])
      );
  }
}
