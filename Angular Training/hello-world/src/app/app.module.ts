import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CoursesService } from './services/courses.service';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorsService } from './services/authors.service';
import { SummaryPipe } from './pipes/summary.pipe';
import { TitleCase } from './pipes/titleCase.pipe';
import { FavouriteComponent } from './favourite/favourite.component';
import { TitleCaseComponent } from './title-case/title-case.component';
import { CardComponent } from './card/card.component';
import { LikeComponent } from './like/like.component';
import { NgifComponent } from './ngif/ngif.component';
import { NgswitchComponent } from './ngswitch/ngswitch.component';
import { NgforofComponent } from './ngforof/ngforof.component';
import { SafetravopComponent } from './safetravop/safetravop.component';
import { CustomdirectiveComponent } from './customdirective/customdirective.component';
import { AppInputFormatDirective } from './app-input-format.directive';
import { ZippyComponent } from './zippy/zippy.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NewCourseFormComponent } from './new-course-form/new-course-form.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PostsComponent } from './posts/posts.component';
import { PostService } from './services/post.service';
import { AppErrorHandler } from './common/error-handler';
import { FollowersComponent } from './followers/followers.component';
import { FollowersService } from './services/followers.service';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseComponent,
    AuthorsComponent,
    SummaryPipe,
    TitleCase,
    FavouriteComponent,
    TitleCaseComponent,
    CardComponent,
    LikeComponent,
    NgifComponent,
    NgswitchComponent,
    NgforofComponent,
    SafetravopComponent,
    CustomdirectiveComponent,
    AppInputFormatDirective,
    ZippyComponent,
    ContactFormComponent,
    CourseFormComponent,
    SignupFormComponent,
    NewCourseFormComponent,
    FormBuilderComponent,
    ChangePasswordComponent,
    PostsComponent,
    FollowersComponent
  ],
  imports: [
BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CoursesService,
    AuthorsService,
    PostService,
    FollowersService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
