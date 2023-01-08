import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss']
})
export class RichTextEditorComponent implements OnInit, OnDestroy {
  @Input()
  value : string = `<h3>Write Here....</h3>`
  @Output() updatedDescription = new EventEmitter<string>();

  editor!: Editor;
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
    this.richtextForm.controls['description'].valueChanges.subscribe((res)=>{
      this.updatedDescription.emit(res);
    })
  }

  createformgroup() {
    this.richtextForm = this.fb.group({
      description: [''],
    });
  }
  ngOnDestroy(): void {
    this.editor.destroy();

  }

}
