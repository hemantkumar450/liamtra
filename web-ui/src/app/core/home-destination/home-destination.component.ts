import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CMSModel } from '../shared';
import { ApiUrl } from '../.../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home-destination',
  templateUrl: './home-destination.component.html'
})
export class HomeDestinationComponent implements OnInit, OnChanges {

  @Input() div: CMSModel;
  @Input() divTitle: CMSModel;
  header: string = "";
  imageArray = [];
  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.div.attachment.length > 0) {
      this.div.attachment.forEach(item => {
        item.attachmentUrl = ApiUrl.SRC_URI + item.attachmentUrl;
      });
    }
    if (this.divTitle && this.divTitle.review.length > 0) {
      this.header = this.divTitle.review[0].reviewRemarks;
    }
  }

  onDestinationClick(destinationUrl) {
    if (destinationUrl) {
      window.open(destinationUrl, "_blank");
    }

  }

}
