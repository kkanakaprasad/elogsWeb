import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RichTextEditorComponent } from './rich-text-editor.component';



@NgModule({
  declarations: [RichTextEditorComponent],
  imports: [
    CommonModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule
  ],exports : [
    RichTextEditorComponent
  ]
})
export class RichTextEditorModule {}
