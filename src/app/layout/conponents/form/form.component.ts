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
  postText: string;
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

      const values = this.parseText(this.postText);

      this.fileList.forEach(file => {
        formData.append('file', file.file, file.file.name);
      });
      formData.append('index', newIndex.toString());
      formData.append('text', values.text);

      this.sendFormEvent.emit({
        postData: formData,
        index: newIndex.toString(),
        replies: values.replies
      });

      this.postForm.reset();
    });
  }

  appendReply(index: number) {
    if (index) {
      if (this.postText) {
        this.postText = this.postText + '\n>>' + index + '>>\r';
      } else {
        this.postText = '>>' + index + '>>\r';
      }
    }
  }

  uploadFiles(data: FileList) {
    for (const file of Array.from(data)) {
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      this.fileList.push({ file, url });
    }
  }

  parseText(text: string) {
    const replyList = [];
    const newText = text.replace(/>>(.*?)>>/g, (a, inside) => {
      replyList.push(inside.replace(/'/g, '"'));
      return '<a href="' + inside.replace(/'/g, '"') + '">' + '>>' + inside.replace(/'/g, '"') + '<a/>';
    });
    return {
      text: newText,
      replies: replyList
    };
  }
}
