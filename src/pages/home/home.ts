import { Component } from '@angular/core';
import {AlertController, ModalController, NavController} from 'ionic-angular';
import {NavPage} from "../nav/nav";

import {Profile} from "../../interfaces/Profile";
import {Account} from "../../interfaces/Account";
import {SMS} from "@ionic-native/sms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public profile = {} as Profile;
  private accountData = {} as Account;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              private sms:SMS) {

  }

  modal() {
    let modal = this.modalCtrl.create('ModalPage');
    modal.onDidDismiss(data => {
      if(Object.keys(data).length === 0) {
        //property 값이 없는 경우, close() 호출해서 리턴된 경우
        console.log(data);
      }else {
        this.profile.actionSwitch = data.actionSwitch;
        this.profile.name = data.name;
        this.profile.gender = data.gender;
        this.profile.domestic = data.domestic;
        this.profile.startDate = data.startDate;
      }
    });
    modal.present();
  }

  //Prompt Alert
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "이름과 E메일을 입력하세요!",
      inputs: [
        {
          name: 'name',
          placeholder: '이름 입력'
        },
        {
          name: 'email',
          placeholder: 'E메일 입력'
        },
      ],
      buttons: [
        {
          text: '취소',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '저장',
          handler: data => {
            console.log(data);
            this.accountData = {name:data.name,email:data.email};
            this.navCtrl.push('NavPage',{account:this.accountData});

          }
        }
      ]
    });
    prompt.present();
  }

  sendSMS() {
    let prompt = this.alertCtrl.create({
      title:'SMS 전송',
      message:'전화번호와 메시지 입력',
      inputs:[
        {name:'phone',placeholder:'phone number'},
        {name:'message',placeholder:'message ...'}
      ],
      buttons:[
        {text:'취소',handler:data => console.log('취소됨')},
        {text:'보내기',
          handler:data => this.sms.send(data.phone,data.message)
        }
      ]
    });
    prompt.present();
  }
}
