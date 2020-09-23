import {
  Directive,
  HostBinding,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';

@Directive({ selector: '[appDrag]' })

export class DragDirective {
  @Output() files: EventEmitter<any> = new EventEmitter();

  @HostBinding('style.background') private background;

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';

    if (evt.dataTransfer.files.length > 0) {
      this.files.emit(evt.dataTransfer.files);
    }
  }
}
