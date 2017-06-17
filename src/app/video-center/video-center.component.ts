import { Component, OnInit } from '@angular/core';
import { Video } from "./../video";
import { VideoService } from "app/video.service";

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {
  public selectedVideo: Video;

  constructor(private _videoService: VideoService) { }
  /*
  videos: Video[] = [
    { "_id": "1", "title": "title1", "url": "url1", "description": "description1" },
    { "_id": "2", "title": "title2", "url": "url2", "description": "description2" },
    { "_id": "3", "title": "title3", "url": "url3", "description": "description3" }
  ]*/

  videos: Array<Video>;
  private hideNewVideo = true;

  onSelectVideo(vid: any) {
    this.selectedVideo = vid;
    this.hideNewVideo = true;
  }

  ngOnInit() {
    this._videoService.getVideos().subscribe(resVideoData => this.videos = resVideoData);
  }

  onSubmitAddVideo(video: Video) {
    this._videoService.addVideo(video)
      .subscribe(resNewVideo => {
        this.videos.push(resNewVideo);
        this.selectedVideo = resNewVideo;
      })
    this.hideNewVideo = true;
  }

  newVideo() {
    this.hideNewVideo = !this.hideNewVideo;
  }

  onUpdateVideoEvent(video: any) {
    this._videoService.updateVideo(video)
      .subscribe(resUpdatedVideo => {
        this.selectedVideo = null;
      })
  }

  onDeleteVideoEvent(video: any) {
    this._videoService.deleteVideo(video)
      .subscribe(resDeletedVideo => {
        this.selectedVideo = null;
        for(let vid in this.videos) {
          if(this.videos[vid]._id == resDeletedVideo._id)
            this.videos.splice(parseInt(vid), 1);
        }
      })
  }

}
