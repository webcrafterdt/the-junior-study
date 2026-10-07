import { Component } from '@angular/core';
import { App } from '@capacitor/app';
import { Location } from '@angular/common';
import {
  NavController,
  AlertController,
  Platform
} from '@ionic/angular';
import { GroupchatService } from './services/groupchat.service';
import OneSignal from 'onesignal-cordova-plugin';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  tid: any;
  Installed_App_Version: any;
  Active_App_Version: any;
  alertcreate: any;

  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];

  public labels = [
    'Family',
    'Friends',
    'Notes',
    'Work',
    'Travel',
    'Reminders'
  ];

  constructor(
    private platform: Platform,
    private _location: Location,
    private navCtrl: NavController,
    private groupchatservice: GroupchatService,
    public alert: AlertController
  ) {

    console.log('app component=>');

    // Initialize OneSignal after native platform is ready
    this.platform.ready().then(() => {
      this.initializeOneSignal();
    });

    // Android back button
    App.addListener('backButton', () => {

      console.log('Back button =>', this._location);

      if (
        this._location.isCurrentPathEqualTo('/home') ||
        this._location.isCurrentPathEqualTo('/login')
      ) {

        (navigator as any).app.exitApp();

      } else {

        this._location.back();

      }
    });

    // Installed app version
    // Need to change this when uploading a new app version
    this.Installed_App_Version = 8;

    // Check active app version
    this.groupchatservice.current_app_version().subscribe(
      async (res) => {

        console.log(
          'current_app_version response =>',
          res
        );

        // Prevent null response error
        if (!res) {

          console.log(
            'Active app version response is null'
          );

          return;
        }

        this.Active_App_Version = res;

        console.log(
          'this.Active_App_Version active_version====>',
          this.Active_App_Version.active_version
        );

        // Prevent undefined active_version
        if (
          this.Active_App_Version.active_version == null
        ) {

          console.log(
            'active_version is null or undefined'
          );

          return;
        }

        if (
          this.Active_App_Version.active_version >
          this.Installed_App_Version
        ) {

          const alertctrl = await this.alert.create({

            header: res.header,

            message: res.message,

            cssClass: 'buttoncsss',

            buttons: [
              {
                text: 'Update App',

                role: 'confirm',

                handler: () => {

                  console.log('aggreed here');

                  window.open(
                    'https://play.google.com/store/apps/details?id=com.shantiniketanns.app',
                    '_system',
                    'location=yes'
                  );

                }
              }
            ]

          });

          await alertctrl.present();

        }

      },

      (error) => {

        console.log(
          'current_app_version API error =>',
          error
        );

      }
    );
  }


  ngOnInit() {

    console.log('before 1');

    // this.lockScreenOrientation();

    console.log('before 2');

  }


  /**
   * Initialize OneSignal
   */
  initializeOneSignal() {

    console.log(
      '========== OneSignal Init =========='
    );

    try {

      // OneSignal App ID
      OneSignal.setAppId(
        '04d71176-7559-4409-9449-09cd0fd86765'
      );

      console.log('AppId Set');


      // Ask notification permission
      OneSignal.promptForPushNotificationsWithUserResponse(
        (accepted) => {

          console.log(
            'Permission Accepted:',
            accepted
          );

        }
      );


      // Notification opened handler
      OneSignal.setNotificationOpenedHandler(
        (jsonData) => {

          console.log(
            'Notification Opened'
          );

          console.log(
            JSON.stringify(jsonData)
          );

        }
      );


      console.log(
        '========== OneSignal Ready =========='
      );

    } catch (error) {

      console.error(
        'OneSignal initialization error =>',
        error
      );

    }

  }

}



