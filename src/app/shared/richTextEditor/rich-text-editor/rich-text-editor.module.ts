import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextEditorComponent } from './rich-text-editor.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
    imports:      [ BrowserModule, FormsModule, CKEditorModule],
    declarations: [ RichTextEditorComponent ],
    bootstrap:    [  ],
    exports:[RichTextEditorComponent,CKEditorModule]
  })
export class RichTextEditorModule { }
