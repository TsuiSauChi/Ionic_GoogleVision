import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Camera} from 'ionic-native';
import 'rxjs/add/operator/map';

@Injectable()
export class CameraService {
base64Image: any;
 constructor(private http: Http) {
    console.log('Hello, This is James');
  }

 getImage()
  {
     Camera.getPicture({
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.DATA_URL,
        mediaType: Camera.MediaType.ALLMEDIA,
        quality: 100,
        targetWidth: 1000,
        targetHeight: 1000,
        encodingType       : Camera.EncodingType.JPEG,
        correctOrientation : true
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });

     return this.base64Image;
  }

}