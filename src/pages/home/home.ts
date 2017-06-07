import { Component,OnInit,ViewChild,ElementRef } from '@angular/core';
import {Camera} from 'ionic-native';
import { NavController, NavParams,ToastController } from 'ionic-angular';
//import {NavParams} from 'ionic-angular';
//import {SafePage} from '../safe/safe';
//import {CameraService} from '../../providers/camera-service';
import {Translator} from '../services/translator';
//import Cropper from 'cropperjs';
import {CameraService} from "../services/camera";
//import {HomePage} from "../home/home";
//import {UnSafePage} from '../un-safe/un-safe';


@Component({

  templateUrl: 'camera.html'
})
export class HomePage {
  /* @ViewChild('image') input: ElementRef;
   imageBase64: any;
   //public base64Image: string;
   //public  base64Image: Array<bytes>
   //image:any;
   width: number;
   height: number;
   cropper: Cropper;*/

  public image:string;
  width:number = 500;
  height:number = 500;
  quality:number = 90;
  picture:string;
  public imageConvert: string;
  newLabel:Array<any> = [];
  labels: Array<any> = [];
  public counter:number = 0;

  //translation
  allergy:string = "butter";
  scanning: Array<any> = [];
  choseLang: boolean = false;
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public testService: Translator ,public cameraService: CameraService,public toastCtrl: ToastController) {
  }

//this.width,this.height,this.quality
  addPhoto(){
    this.cameraService.getImage()
      .subscribe( (data) => {
          this.image = (data);
          this.imageConvert = this.image.replace(/^data:image\/[a-z]+;base64,/, "");
          this.getVision(this.imageConvert);
          //this.matchText();
        },(error) => {
          // Toast errot and return DEFAULT_PHOTO from Constants
          this.toast(error);
        }
      );
  }

  toast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2500,
      showCloseButton: false
    });
    toast.present();
  }


  getVision(image64: string) {

    this.testService.getVisionLabels(image64)
      .subscribe((sub) => {
        this.labels = sub.responses[0].textAnnotations;
        console.log(this.labels);
        //this.matchText(this.labels[0]);
      });
  }


 matchText(array){
    for(var i = 0; i < 1; i++) {

      console.log('code reach here 1');
      var label = this.labels[i];
      var ingredients = label.description.toString().split(/[(,)]/igm).map(function (ingredients){return ingredients.trim()}, {
      });

      let ingredientList:string[] = ingredients;
      for(var k = 0; k<ingredientList.length; k++){
        if(ingredientList[k] === ""){
          ingredientList = ingredientList.filter((ingredientList) =>{
            return ingredientList.trim() != '';
          });
        }
      }

     for(var j = 0; j<ingredientList.length; j++){
        let allergy:string[] = ["OIL","SUGAR"];
        for(var e = 0; e<allergy.length; e++) {
          var regexp = new RegExp(allergy[e], "igm");

          console.log(ingredientList[j]);

          if(ingredientList[j].match(regexp)){
          this.counter++;
          console.log('Match');
          }
          else {
            console.log('No Match');
          }
        }
      }

      if(this.counter >0){
       // this.navCtrl.push(UnSafePage);
      }
      
      else{
        //this.navCtrl.push(SafePage);
      }


    }
  }


  backToHome():void{
   // this.navCtrl.setRoot(HomePage);
  }
  showFlow():void{
    //this.navCtrl.setRoot(SafePage);
  }
  ionViewDidLoad() {
    this.counter = 0;
    console.log(this.counter);
  }
  ionViewDidEnter(){
   this.counter = 0;
  }

}
