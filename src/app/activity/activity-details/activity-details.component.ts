import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from 'src/app/organization/organization.service';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';
import { RouteConstants } from 'src/app/shared/constants/routes.constants';
import { Roles } from 'src/app/shared/enums/roles.enums';
import { STORAGE_KEYS } from 'src/app/shared/enums/storage.enum';
import { CsvHelperService } from 'src/app/shared/services/csv-helper-service/csv-helper.service';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';
import { UserDetailsService } from 'src/app/shared/services/user-details-service/user-details.service';
import { UserService } from 'src/app/user/user.service';
import { ActivitiesDownloadHeaders, Priority, Status, Visibility } from '../activity.constant';
import { ActivityService } from '../activity.service';
import { FileuploaderComponent } from 'src/app/shared/fileuploader/fileuploader.component';

@Component({
	selector: 'app-activity-details',
	templateUrl: './activity-details.component.html',
	styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {

  @ViewChild('uploader')
  uploader!: FileuploaderComponent;

	selectedActivityId: any;
	activityDetails: any;
	activityLogForm!: FormGroup;
	Priority = Priority;
	visibility = Visibility
	status = Status
	organizationList: any;
	filesListArray: any[] = [];
	description: string = '';

	selectedActivityEntryTypeId: any;
	activityEntryType: any;
	activityRelatedTypesData: any;
	selectedActivityRelatedTypeId: any;
	selectedActivityTypesDataId: any;
	activityTypesData: any;
	selectedPriorityId: any;
	activityPriority: any;
	activityData: any;
	activitySectorsData: any;
	selectedActivitySectorId: any;
	selectedActivityScopeId: any;
	ActivityScopeData: any;
	selectedActivityCreatedById: any;
	organizationCreatedBy: any;
	activityLogData: any;
	selectedDate: any;
	toDay = new Date();
	isArchive: any;
	activityType: any;
	selectedActivityTypeId: any;
	organizationsInvolved: any;
	activityReportedBy: any;
	selectedActivityAssignedTo: any;
	ActivityTimeLogs: any;
	activityFiles: any = [];
	isSuperAdmin!: boolean;
	logedInUserId: any;
	logedInUserDetails: any;
	isAssignee: any;
	ministryName: any;
	isFilesListArray: boolean = true;
	minDate: any;
	fileAttachmments :any;
	peopleInvolved : any = []


	constructor(
		private activatedRoute: ActivatedRoute,
		private activityService: ActivityService,
		private formBuilder: FormBuilder,
		private organizationService: OrganizationService,
		private router: Router,
		private alertpopupService: AlertpopupService,
		private confirmationDialogService: ConfirmationDialogService,
		private userService: UserService,
		private csvHelperService: CsvHelperService,
		private storageService: StorageService,
		private userDetailsService: UserDetailsService
	) {
		this.activatedRoute.queryParams.subscribe((res) => {
			this.selectedActivityId = res['aId'];
		});
	}

	ngOnInit(): void {
		this.getActivityDetailsById()
		this.getActivityMasterData()
		this.getAllOrganizationsBySearchCriteria()
		this.genarateActivityLogForm()
		this.isSuperAdmin = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.ROLE) === Roles.SuperAdmin ? true : false
		this.logedInUserId = this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID)
		this.minDate = new Date();
	}


	getActivityDetailsById() {
		this.activityService.getActivityById(this.selectedActivityId).subscribe(res => {
			this.activityData = res.data[0]
			this.selectedActivityEntryTypeId = res.data[0]?.activitEntryType
			this.selectedActivityRelatedTypeId = res.data[0]?.activityRelatedTo
			this.selectedActivitySectorId = res.data[0]?.activitySector
			this.selectedActivityScopeId = res.data[0]?.activityScope
			this.selectedActivityCreatedById = res.data[0]?.createdBy
			this.organizationCreatedBy = this.activityData?.createdByOrganizationData[0]?.organization
			this.activityLogData = this.activityData?.activityLog
			this.isArchive = this.activityData?.isArchive
			this.selectedActivityTypeId = this.activityData?.activityType
			this.organizationsInvolved = [...this.activityData?.assignToObj,...this.activityData?.organizationData,...this.activityData?.createdByOrganizationData]
			this.ministryName = this.activityData?.organizationData.map((res:any)=>res.organization)
			this.selectedActivityAssignedTo = this.activityData?.organizationData.filter((organization: any) => organization._id == this.activityData?.assignTo).map((item: any) => item.organization)
			this.getUserById()
			this.getLogedInUserDetails()
			this.activityFiles = this.activityData.attachments;
			for(const activityLog of this.activityData.activityLog) {
				if(activityLog.attachments.length > 0) {
					this.activityFiles = this.activityFiles.concat(activityLog.attachments)
				}
			}
			this.activityFiles = this.activityFiles.sort((a: any, b: any) => {
				return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
			});
			this.ActivityTimeLogs = this.activityData?.statusLog
			this.activityLogForm.controls['priority'].setValue(this.activityData?.priority)
			this.activityLogForm.controls['status'].setValue(this.activityData?.status)
			this.activityLogForm.controls['assignTo'].setValue(this.activityData?.assignTo)
			this.activityLogForm.controls['visibility'].setValue(this.activityData?.visibility ? this.activityData?.visibility :this.visibility[1]);
			this.peopleInvolved = this.organizationsInvolved.filter((obj: any, index: any, self: any) =>
			index === self.findIndex((o:any) =>
				o._id === obj._id ));
		})
	}

	getLogedInUserDetails() {
		this.userDetailsService.getUserDetails().subscribe((res) => {
			this.logedInUserDetails = res
			this.isAssignee = res?.organization?.includes(this.activityData?.assignTo);
		})
	}

	getActivityMasterData() {
		this.activityService.getActivitiesMasterData().subscribe(res => {
			this.activityEntryType = res.data?.activityEntryTypesData.filter((activityEntry: any) => activityEntry._id == this.selectedActivityEntryTypeId).map((item: any) => item.name)
			this.activityRelatedTypesData = res.data?.activityRelatedTypesData.filter((activityRelated: any) => activityRelated._id == this.selectedActivityRelatedTypeId).map((item: any) => item.name)
			this.activitySectorsData = res.data?.activitySectorsData.filter((sectorsData: any) => sectorsData._id == this.selectedActivitySectorId).map((item: any) => item.name)
			this.ActivityScopeData = res.data?.activityScopesData.filter((activityScopesData: any) => activityScopesData._id == this.selectedActivityScopeId).map((item: any) => item.name)
			this.activityType = res?.data?.activityTypesData.filter((activitytype: any) => activitytype._id == this.selectedActivityTypeId).map((item: any) => item.name)
		})
	}

	getUserById() {
		this.userService.getUserById(this.activityData?.createdBy).subscribe(res => {
			this.activityReportedBy = res?.existingUser?.Name
		})
	}

	genarateActivityLogForm() {
		this.activityLogForm = this.formBuilder.group({
			priority: ['', [Validators.required]],
			visibility: ['', [Validators.required]],
			status: ['', [Validators.required]],
			assignTo: ['', [Validators.required]],
			attachments: ['', [Validators.required]],

		})
	}

	setOrganizationIdInActivityLog(){
		if(this.logedInUserDetails.organization.length === 0){
			return this.logedInUserDetails.organization[0];
		}else{
			let organizationId = this.logedInUserDetails?.organization.filter((org : string)=> org === this.activityData?.assignTo)
			if(organizationId.length !== 0 ){
				return organizationId[0];
			}else{
				organizationId = this.logedInUserDetails?.organization.filter((org : string)=> org === this.activityData?.createdByOrganization);
				return organizationId[0];
			}
		}
	}

	onSubmit() {
		const payload = {
			...this.activityLogForm.value,
			organizationId : this.setOrganizationIdInActivityLog(),
			attachments: this.filesListArray?.length === 0 ? undefined : this.filesListArray,
			message: this.description
		}
		this.activityService.updateActivityLogById(this.selectedActivityId, payload).subscribe(res => {
			let details = res.data.activityLog
			if(this.fileAttachmments?.length > 0){
				let formData = new FormData()
				for(let fileIndex = 0 ; fileIndex < this.fileAttachmments?.length; fileIndex++ ){
					formData.append(`${this.selectedActivityId}/${details[details.length - 1]._id}`, this.fileAttachmments[fileIndex], this.filesListArray[fileIndex].name )
				}
				this.uploadAttachments(formData);
			}

			this.alertpopupService.open({
				message: res?.message ? res?.message : 'Activity Updated Successfully',
				action: 'ok'
			})
			this.getActivityDetailsById()
			this.activityLogForm?.reset()
			this.description = ''
			this.isFilesListArray = false

		}, (error) => {
			this.alertpopupService.open({
				message: error.message ? error.message : "something went wrong!",
				action: "ok"

			});
		})
	}

	getAllOrganizationsBySearchCriteria() {
		const payload = {
			pageNumber: 0,
			pageSize: 50,
			sortField: "",
			sortOrder: 0,
			type: "63973bfb61ab6f49bfdd3c35",
			organization: "",
			organizationId: "",
			isActive: true,
			userId: "",
			userSearch: ""
		}
		this.organizationService.getOrganizationsSearchCriteria(payload).subscribe((res) => {
			this.organizationList = res.data.organizations
		})
	}

	updatedDescription(event: string) {
		this.description = event
	}

	updatedFilesDescription(event: any) {
		let organizationId : string;
		let organization : string;
		if(this.isSuperAdmin){
			organizationId = this.activityData?.createdByOrganization;
			organization = this.activityData?.createdByOrganizationData[0].organization
		}
		else if(this.logedInUserDetails.organization?.includes(this.activityData?.assignTo) && this.logedInUserDetails.organization?.includes(this.activityData?.createdByOrganization)){
			organizationId = this.activityData?.assignTo
			organization = this.selectedActivityAssignedTo[0]
		}else if(this.logedInUserDetails.organization?.includes(this.activityData?.assignTo)){
			organizationId = this.activityData?.assignTo
			organization = this.selectedActivityAssignedTo[0]
		}else {
			organizationId = this.activityData?.createdByOrganization
			organization = this.activityData?.createdByOrganizationData[0].organization
		}
		let files = event.target.files;
		this.fileAttachmments = files;
		for (var i = 0; i < files.length; i++) {
		  this.filesListArray.push({
			name: files[i].name,
			size: files[i].size.toString(),
			path: "string",
			organization : organization,
			organizationId : organizationId,
			type : files[i].type
		  });
		}
	}

	updateActivityDetails() {
		this.router.navigate([RouteConstants.CREATEACTIVITY], { queryParams: { aId: this.selectedActivityId } });
	}


	dueDateSetter(selectedOption: any, selectedOptionalDate?: any) {
		this.toDay = new Date();
		if (selectedOption == 'noDueDate') {
			this.selectedDate = ""

		} else if (selectedOption == 'Today') {
			this.selectedDate = new Date()

		} else if (selectedOption == 'Tomorrow') {
			this.selectedDate = new Date(this.toDay.setDate(this.toDay.getDate() + 1))

		} else if (selectedOption == 'Next Monday') {
			this.selectedDate = new Date(this.toDay.setDate(this.toDay.getDate() + (7 - this.toDay.getDay()) % 7 + 1))

		} else if (selectedOption == 'This Friday') {
			this.selectedDate = new Date(this.toDay.setDate(this.toDay.getDate() + (12 - this.toDay.getDay()) % 7))

		} else if (selectedOption == 'custom') {
			this.selectedDate = selectedOptionalDate.value

		}

		this.activityService.updateActivityDueDate(this.selectedActivityId, { dueDate: this.selectedDate }).subscribe(res => {
			this.alertpopupService.open({
				message: res.message ? res.message: 'activity due date updated sucessfully',
				action: 'ok'
			})
			this.getActivityDetailsById()
		}, (error) => {
			this.alertpopupService.open({
				message: "Faild to create Organization! Please try again ",
				action: 'ok'
			})
		})
	}

	updateSelectedArchiveStatus() {
		const payload = {
			isArchive: true
		}
		this.confirmationDialogService.open({
			message: `Are you sure you want to archive ${this.activityData?.uniqIdentity}`
		}).afterClosed().subscribe((res) => {
			if (res) {
				this.activityService.updateArchivestatus(this.selectedActivityId, payload).subscribe(res => {
					this.alertpopupService.open({
						message: res.message,
						action: 'ok'
					})
					this.getActivityDetailsById()
				}, (error) => {
					this.alertpopupService.open({
						message: "Faild to archive Organization! Please try again ",
						action: 'ok'
					})
				})
			}
		})

	}

	restoreActivity(){
		const payload = {
			isArchive: false
		}
		this.confirmationDialogService.open({
			message: `Are you sure you want to restore ${this.activityData?.uniqIdentity}`
		}).afterClosed().subscribe((res) => {
			if (res) {
				this.activityService.updateArchivestatus(this.selectedActivityId, payload).subscribe(res => {
					this.alertpopupService.open({
						message:`Activity Restored Successfully`,
						action: 'ok'
					})
					this.getActivityDetailsById()
				}, (error) => {
					this.alertpopupService.open({
						message: "Faild to Restored Organization! Please try again ",
						action: 'ok'
					})
				})
			}
		})
	}

	deleteSelectedActivity() {
		this.confirmationDialogService.open({
			message: `Are you sure you want to delete ${this.activityData?.uniqIdentity}`
		}).afterClosed().subscribe((res) => {
			if (res) {
				this.activityService.deleteSelectedActivity(this.selectedActivityId).subscribe(res => {
					this.alertpopupService.open({
						message: res.message,
						action: 'ok'
					})
					this.router.navigate([RouteConstants.ACTIVITY]);
				}, (error) => {
					this.alertpopupService.open({
						message: "Faild to create Organization! Please try again ",
						action: 'ok'
					})
				})
			}
		})
	}

	updateStatusOfSelectedActivity(currentStatus: string) {
		let selectedActivity = ''
		if (currentStatus == "Reject") {
			selectedActivity = Status[2]
		} else if (currentStatus == 'Resolve') {
			selectedActivity = Status[4]
		}
		const payload = {
			status: selectedActivity,
		}
		this.confirmationDialogService.open({
			message: `Are you sure you want to ${currentStatus} ${this.activityData?.uniqIdentity}`
		}).afterClosed().subscribe((res) => {
			if (res) {
				this.activityService.updateActivityStatus(this.selectedActivityId, payload).subscribe(res => {
					this.alertpopupService.open({
						message: res.message,
						action: 'ok'
					})
					this.getActivityDetailsById()
				}, (error) => {
					this.alertpopupService.open({
						message: "Faild to create Organization! Please try again ",
						action: 'ok'
					})
				})
			}
		})
	}

	downloadActivity() {
		let activityLogAndDueLog: any = [...this.activityData.activityLog, ...this.activityData.dueDateLog];
		activityLogAndDueLog = activityLogAndDueLog.sort((a: any, b: any) => {
			return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
		}
		);
		let activityDataForDownload = [{
			title: this.activityData.title,
			description: this.activityData.description.replace(/<[^>]*>/g, ""),
			status:'New',
			assignedTo: this.selectedActivityAssignedTo.toString(),
			dueDate: this.activityData.dueDate,
			attachments: this.activityData.attachments.length == 0 ? "NO" : this.activityData.attachments[0].name.toString(),
			priority: 'None',
			type: this.activityType.toString(),
			sector: this.activitySectorsData.toString(),
			entryType: this.activityEntryType.toString(),
			ministry: this.organizationsInvolved[0].organization,
			scope: this.ActivityScopeData.toString(),
			relatedTo: this.activityRelatedTypesData.toString(),
			categoryMappedTo: "",
			activityprogress: "",
			reportedBy : this.activityData.createdByOrganizationData[0].organization,
			activityId : this.activityData.uniqIdentity,
			createdAt : this.activityData.createdAt,
		}];
		activityLogAndDueLog.forEach((element: any, index: number,) => {
			let data = { ...activityDataForDownload[0]};
			data.attachments = '';
			if(element?.attachments && element?.attachments.length !== 0){
				element.attachments.forEach((file : any)=>{
					if(data.attachments){
						data.attachments = `${data.attachments} ;`
					}
					data.attachments = `${data.attachments} ${file.name}`
				})
			}
			if (element.dueDate && !element.isInitialLog) {
				data.dueDate = element.dueDate,
				data.createdAt = element.createdAt
				activityDataForDownload.push(data);
			} else if (element.message) {
				data.description = element?.message.replace(/<[^>]*>/g, ""),
				data.createdAt = element.createdAt
				data.status = element?.status ? element.status : data.status,
				data.priority = element?.priority ? element.priority : data.priority,
				activityDataForDownload.push(data);
			}
		});
		const headersList: { propertyName: string, displayName: string }[] = [
			...ActivitiesDownloadHeaders,
			{
				propertyName : 'attachments',
				displayName : 'Attachments'
			},
			{
				propertyName : 'priority',
				displayName : 'priority'
			},
			{
				propertyName : 'sector',
				displayName : 'Sector'
			},
			{
				propertyName : 'relatedTo',
				displayName : 'Related'
			},

		]
		this.csvHelperService.downloadFile(activityDataForDownload, "activity details", headersList)

	}

	refreshPage() {
		this.getActivityDetailsById()
	}

	resetActivityLogForm() {
		this.activityLogForm.reset()
	}

	navigateToPreviousRoute() {
		this.router.navigate([RouteConstants.ACTIVITY])
	}

	statusClass(status: string) {
		return status === 'MEDIUM' ? 'confirm'
			: status === 'HIGH' ? 'reject'
				: ''
	}

	isShowActivityLog(activity : any){
		if(this.isSuperAdmin){
			return true
		}else if(activity.visibility === "EVERYONE" ){
			return true;
		}else{
			let value = this.logedInUserDetails.organization.includes(activity.organizationId);
			if(value){
				return true;
			}else{
				value = this.logedInUserDetails.organization.includes(activity.organizationId);
				return value;
			}
		}
	}

	uploadAttachments(formData : FormData){
		this.activityService.uploadAttachments(formData).subscribe((res:any)=>{
      this.filesListArray =[];
      this.uploader.clearFiles();
		})
	  }

	downloadAttachment(activityLogData : any,attachmentData : any){
		const payload ={
			fileName : attachmentData.name,
			path : `${this.selectedActivityId}/${activityLogData._id}`
		}

		this.activityService.dowloadAttachments(payload).subscribe((blob=>{
			const link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = attachmentData.name;
			link.click();
			window.URL.revokeObjectURL(link.href);
		}),(error:any)=>{
		})
	}

	downloadActivityAttachment(attachmentData:any){
		const payload ={
			fileName : attachmentData.name,
			path : `${this.selectedActivityId}`
		}

		this.activityService.dowloadAttachments(payload).subscribe((blob=>{
			const link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = attachmentData.name;
			link.click();
			window.URL.revokeObjectURL(link.href);
			this.alertpopupService.open({
				message : 'Attachment downloaded successfully',
				action : 'Ok'
			});
		}),(error:any)=>{
			this.alertpopupService.open({
				message : 'Attachment Not Found',
				action : 'Ok'
			});
		})
	}

}






