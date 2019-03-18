import { Component, OnInit, Input } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "./../shared/auth.service";
import { Token } from "./../shared/token";
import { VideoService } from "./../services/video.service";
import { ToastrService } from "ngx-toastr";
import { Video } from "./../models/video";
import { NgForm } from "@angular/forms";
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.sass"]
})
export class AdminComponent implements OnInit {
  @Input() video: Video;
  token: Token;
  errorMessage: string;
  videos: Video[] = [];
  regModel: Video;
  pdfname: string;
  selectedFiles: FileList;
  currentFileUpload: File;

  search: string;
  selectedFilesVideo: FileList;
  currentFileUploadVideo: File;

  youtube: boolean;
  name: string;
  url: string;

  closeResult: string;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private videoService: VideoService,
    private authService: AuthService
  ) {}

  onFileSelected(event) {
    this.selectedFiles = event.target.files;
    this.pdfname = this.selectedFiles.item(0).name;
  }

  onFileSelectedVideo(event) {
    this.selectedFilesVideo = event.target.files;
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  GetVideos() {
    this.authService.login().subscribe(
      token => {
        this.token = token;
        this.videoService.GetVideos(this.token).subscribe(
          listOrders => {
            this.videos = listOrders;
          },
          error => (this.errorMessage = <any>error)
        );
      },
      error => (this.errorMessage = <any>error)
    );
  }

  onEdit2(orderToEdit: Video) {
    this.regModel = new Video();
    this.regModel = Object.assign({}, orderToEdit);
  }

   onEdit(id: number) {
    let filterData = this.videos.filter((order: Video) => order.id == id);
    this.onEdit2(filterData[0]);
  }

  updateVideoURL(form: NgForm){
    this.authService.login().subscribe(
      token => {
        this.token = token;
        if (this.video === undefined) {
          this.video = new Video();
        }
        this.video.id = this.regModel.id;
        this.video.name = this.regModel.name;
        this.video.url = this.regModel.url;

        this.videoService.UpdateVideoURL(this.token, this.video).subscribe(
          arbitro => {
            form.reset();
            this.modalService.dismissAll();
            this.GetVideos();
            this.toastr.success('The video was successfully updated!', 'Success');
          },
          error => (this.errorMessage = <any>error),
        );
      },
      error => (this.errorMessage = <any>error),
    );
  }

  updateVideo(form: NgForm){

    if(this.selectedFilesVideo == undefined || this.selectedFilesVideo == null){

      this.authService.login().subscribe(
        token => {
          this.token = token;
          if (this.video === undefined) {
            this.video = new Video();
          }
          this.video.id = this.regModel.id;
          this.video.name = this.regModel.name;
  
          this.videoService.UpdateVideoName(this.token, this.video).subscribe(
            arbitro => {
              form.reset();
              this.modalService.dismissAll();
              this.GetVideos();
              this.selectedFilesVideo = null;
              this.toastr.success('The video was successfully updated!', 'Success');
            },
            error => (this.errorMessage = <any>error),
          );
        },
        error => (this.errorMessage = <any>error),
      );
    } else {
      this.currentFileUploadVideo = this.selectedFilesVideo.item(0);
      this.videoService.pushFileToStorageUpdate(this.currentFileUploadVideo, this.regModel.name, this.regModel.video, this.regModel.id).subscribe(event => {
        if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          this.GetVideos();
          form.reset();
          this.modalService.dismissAll();
          this.toastr.success('The video was successfully updated!', 'Success');
        }});
    }

  }

  EliminarVideo(name: string, id: number, video: string) {
    if (confirm('Do you want to delete the video: ' + name + ' ?')) {
      this.videoService.DeleteVideo(this.token, id, video).subscribe(
        arbitro => {
          this.GetVideos();
          this.toastr.success('The video was successfully deleted!', 'Success');
        },
        error => (this.errorMessage = <any>error),
      );

    }
  }
  
  EliminarURL(name: string, id: number) {
    if (confirm('Do you want to delete the video: ' + name + ' ?')) {
      this.videoService.DeleteURL(this.token, id).subscribe(
        arbitro => {
          this.GetVideos();
          this.toastr.success('The video was successfully deleted!', 'Success');
        },
        error => (this.errorMessage = <any>error),
      );

    }
  }

  addVideo(form: NgForm){
    this.GetVideos();
    var nombre = this.videos.find(x => x.name == this.name);

    if(nombre !== undefined){
      this.toastr.error('The video already exists!', 'Error');
    }else {
      if(this.youtube){
        this.authService.login().subscribe(
          token => {
            this.token = token;
            if (this.video === undefined) {
              this.video = new Video();
            }
            this.video.name = this.name;
            this.video.url = this.url;
  
            this.videoService.AddVideoURL(this.token, this.video).subscribe(
              arbitro => {
                this.GetVideos();
                form.reset();
                this.modalService.dismissAll();
                this.toastr.success('The video was successfully updated!', 'Success');
              },
              error => (this.errorMessage = <any>error),
            );
          },
          error => (this.errorMessage = <any>error),
        );
      }
      else{
        this.currentFileUpload = this.selectedFiles.item(0);
        this.videoService.pushFileToStorage(this.currentFileUpload, this.name).subscribe(event => {
          if (event instanceof HttpResponse) {
            console.log('File is completely uploaded!');
            this.GetVideos();
            form.reset();
            this.modalService.dismissAll();
            this.toastr.success('The video was successfully updated!', 'Success');
          }});
      }
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.GetVideos();
  }
}
