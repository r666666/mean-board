import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  files: any;
  apiUrl: string;

  @Input() index: string;
  @Input() text: string;
  @Input() replies?: string;
  @Input() fileData?: any;
  @Output() selectIdEvent;

  constructor(
    private sanitizer: DomSanitizer
  ) {
    this.selectIdEvent = new EventEmitter<string>();

    this.files = [];
    this.apiUrl = 'http://localhost:4000';
  }

  ngOnInit() {
    if (this.fileData) {
      this.fileData.forEach(file => {
        const tempFile = {
          path: this.sanitizer.bypassSecurityTrustResourceUrl(this.apiUrl + file.path),
          type: file.type
        }
        this.files.push(tempFile);
      });
    }
  }

  selectId(value: string) {
    this.selectIdEvent.emit(value);
  }

  editReplies(data: any) {
    const newReplies = [];

    data.forEach((element, index) => {
      if (index + 1 !== data.length) {
        newReplies.push(element + ', ');
      } else {
        newReplies.push(element);
      }
    });

    return newReplies;
  }
}
