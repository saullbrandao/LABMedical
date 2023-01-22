import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { HotToastModule } from '@ngneat/hot-toast';

@NgModule({
  declarations: [AppComponent, ToolbarComponent, MenuComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, HotToastModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
