import { Component, OnInit, Input } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "./../shared/auth.service";
import { Token } from "./../shared/token";
import { VideoService } from "./../services/video.service";
import { ToastrService } from "ngx-toastr";
import { Video } from "./../models/video";
import { NgForm } from "@angular/forms";

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
  selectedFiles: FileList;
  pdfname: string;

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

  addVideo(form: NgForm){
    alert(this.pdfname);
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
