import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './views/home/home.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { AgePipe } from './pipes/age.pipe';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginComponent } from './views/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './utils/token.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { HttpErrorInterceptor } from './utils/http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MenuComponent,
    HomeComponent,
    AgePipe,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HotToastModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
