import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './views/home/home.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { AgePipe } from './pipes/age.pipe';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MenuComponent,
    HomeComponent,
    AgePipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, HotToastModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
