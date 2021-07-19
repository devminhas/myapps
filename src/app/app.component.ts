import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Category } from './model/category-model';
import { HomeService } from './services/home.service';
import { NavigationStart, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  categories:Category[]=[];
  selectedPath='';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private homeService:HomeService,
    private menuController:MenuController
  ) {
   
    this.initializeApp();
    this.homeService.getCatoryList().subscribe(data=>{
      this.categories=data;
    })
  }
   
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  close() {
    this.menuController.toggle();
  }
}
