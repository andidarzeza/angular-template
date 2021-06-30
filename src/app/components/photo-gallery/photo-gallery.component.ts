import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {

  public selectedPhotoIndex = 0;
  public previousPhoto = "";
  public selectedPhoto = "";
  public nextPhoto = "";
  public photos = ["./../../../assets/photos/photo1.jpg", "./../../../assets/photos/photo2.jpg", "./../../../assets/photos/photo3.jpg"];
  constructor() { }

  ngOnInit(): void {
    if(this.photos.length == 1) {
      this.selectedPhoto = this.photos[0];
      this.selectedPhotoIndex = 0;
    } else if(this.photos.length == 2) {
      this.previousPhoto = this.photos[0];
      this.selectedPhoto = this.photos[1];
      this.selectedPhotoIndex = 1;
    } else if(this.photos.length >= 3) {
      this.previousPhoto = this.photos[0];
      this.selectedPhoto = this.photos[1];
      this.selectedPhotoIndex = 1;
      this.nextPhoto = this.photos[2];
    }
  }

  getNextPhoto(): void {
    if(this.selectedPhotoIndex !== (this.photos.length-1)) {
      this.selectedPhotoIndex++;
      this.selectedPhoto = this.photos[this.selectedPhotoIndex];
      this.previousPhoto = this.photos[this.selectedPhotoIndex - 1];
    }
  }

}
