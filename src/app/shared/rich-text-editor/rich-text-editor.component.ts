import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss']
})
export class RichTextEditorComponent implements OnInit, OnDestroy {
  editor!: Editor;
  value: any;
  richtextForm!: FormGroup;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  html!: '';
  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.editor = new Editor();
    this.editor.commands
      .focus()
      .scrollIntoView()
      .exec();
    this.createformgroup();
  }

  createformgroup() {
    this.richtextForm = this.fb.group({
      editorContent: [''],
    });
  }
  ngOnDestroy(): void {
    this.editor.destroy();

  }

}
