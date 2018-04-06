import { Router } from '@angular/router';
import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';

@Component({
    selector: 'app-video-modal',
    templateUrl: './video-modal.component.html'
})

export class VideoModalComponent implements OnInit {
    count: number = 0;
    @Output() vidoeModalPopupEvent = new EventEmitter();
    @Input() isVideoModal: boolean = true;
    @Input() videobaseModal: any;
    constructor() {
    }

    ngOnInit() { }

    closeModal() {
        this.isVideoModal = false;
        this.vidoeModalPopupEvent.emit(false);
    }

}
