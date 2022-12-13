import { Component, OnInit } from '@angular/core';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss']
})

export class RichTextEditorComponent implements OnInit {
  public Editor = ClassicEditorBuild;
  //public Editor = ClassicEditor;


  constructor() { }

  ngOnInit(): void {
    
  }
  
}
