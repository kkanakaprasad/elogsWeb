import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ConfirmationDialogModule } from "./confirmation-dialog/confirmation-dialog.module";
import { CustomModelModule } from "./custom-model/custom-model.module";
import { MaterialModule } from "./Modules/material/material.module";
import { RichTextEditorModule } from "./richTextEditor/rich-text-editor/rich-text-editor.module";


@NgModule({
    declarations: [
    ],
    imports: [
      CommonModule,
      FormsModule,
      MaterialModule,
      CustomModelModule,
      ConfirmationDialogModule,
      RichTextEditorModule
    ],
    exports : [
        MaterialModule,
      CustomModelModule,
      ConfirmationDialogModule,
      RichTextEditorModule
    ]
  })
export class SharedModule { }
