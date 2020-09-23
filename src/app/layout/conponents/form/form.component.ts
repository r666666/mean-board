import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThreadService } from '../../../services/thread/thread.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {
  postForm: FormGroup;
  fileList: any[];

  @Input() reply;
  @Output() sendFormEvent;

  constructor(
    private fb: FormBuilder,
    private ts: ThreadService,
    private sanitizer: DomSanitizer
  ) {
    this.fileList = [];

    this.sendFormEvent = new EventEmitter<FormGroup>();

    this.postForm = this.fb.group({
      postText: ['', Validators.required ],
      fileInput: ['']
    });
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.appendReply(changes.reply.currentValue);
  }

  sendForm() {
    this.ts.getGlobalIndex().subscribe(newIndex => {
      const formData = new FormData();
      let replyList = '';

      this.fileList.forEach(file => {
        formData.append('file', file.file, file.file.name);
      });
      formData.append('index', newIndex.toString());
      formData.append('text', this.postForm.value.postText);

      // get relies from text
      if (this.postForm.value.postText.match(/>>(.*?)>>/g)) {
        replyList = this.postForm.value.postText.match(/>>(.*?)>>/g).map((val) => {
          return val.replace(/>>/g, '');
        });
      }

      this.sendFormEvent.emit({
        postData: formData,
        index: newIndex.toString(),
        replies: replyList
      });

      this.postForm.reset();
    });
  }

  appendReply(index: number) {
    if (index) {
      if (this.postForm.value.postText) {
        this.postForm.controls.postText.setValue(this.postForm.value.postText + '\n>>' + index + '>>\r');
      } else {
        this.postForm.controls.postText.setValue('>>' + index + '>>\r');
      }
    }
  }

  uploadFiles(data: FileList) {
    for (const file of Array.from(data)) {
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      this.fileList.push({ file, url });
    }
  }
}
