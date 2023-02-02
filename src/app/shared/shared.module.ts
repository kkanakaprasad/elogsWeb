import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivityModule } from "../activity/activity.module";
import { ConfirmationDialogModule } from "./confirmation-dialog/confirmation-dialog.module";
import { CustomModelModule } from "./custom-model/custom-model.module";
import { MaterialModule } from "./Modules/material/material.module";
import { RichTextEditorModule } from "./rich-text-editor/rich-text-editor.module";
import { SearchPipe } from './pipes/search.pipe';
import { FileUploaderDirective } from './fileUploaderDirective/file-uploader.directive';
import { FileuploaderModule } from "./fileuploader/fileuploader.module";
import { UppercaseInputDirective } from './directives/uppercase-input.directive';


@NgModule({
    declarations: [
    SearchPipe,
    FileUploaderDirective,
    UppercaseInputDirective
  ],
    imports: [
      CommonModule,
      FormsModule,
      MaterialModule,
      CustomModelModule,
      ConfirmationDialogModule,
      RichTextEditorModule,
      FileuploaderModule,
    ],
    exports : [
      MaterialModule,
      CustomModelModule,
      ConfirmationDialogModule,
      RichTextEditorModule,
      SearchPipe,
      FileuploaderModule,
      UppercaseInputDirective
    ]
  })
export class SharedModule { }
