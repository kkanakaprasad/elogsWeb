import { Component, OnInit } from '@angular/core';
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
import { Priority, Status, Visibility } from '../activity.constant';
import { ActivityService } from '../activity.service';

@Component({
	selector: 'app-activity-details',
	templateUrl: './activity-details.component.html',
	styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
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
	isSuperAdmin!: boolean;
	logedInUserId: any;
	logedInUserDetails: any;
	isAssignee: any;
	ministryName: any;
	isFilesListArray: boolean = true;


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
			this.organizationsInvolved = this.activityData?.organizationData
			this.ministryName = this.activityData?.organizationData.map((res:any)=>res.organization)
			this.selectedActivityAssignedTo = this.activityData?.organizationData.filter((organization: any) => organization._id == this.activityData?.assignTo).map((item: any) => item.organization)
			this.getUserById()
			this.getLogedInUserDetails()
			this.ActivityTimeLogs = this.activityData?.statusLog
			this.activityLogForm.controls['priority'].setValue(this.activityData?.priority)
			this.activityLogForm.controls['status'].setValue(this.activityData?.status)
			this.activityLogForm.controls['assignTo'].setValue(this.activityData?.assignTo)
		})
	}

	getLogedInUserDetails() {
		this.userDetailsService.getUserDetails().subscribe((res) => {
			this.logedInUserDetails = res
			this.isAssignee = res?.organization?.includes(this.activityData?.assignTo)
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

	onSubmit() {
		const payload = {
			...this.activityLogForm.value,
			attachments: this.filesListArray.length === 0 ? undefined : this.filesListArray,
			message: this.description
		}
		this.activityService.updateActivityLogById(this.selectedActivityId, payload).subscribe(res => {
			this.alertpopupService.open({
				message: res.message ? res.message : 'Activity Updated Successfully',
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
		for (var i = 0; i < event.length; i++) {
			this.filesListArray.push({
				name: event[i].name,
				size: event[i].size,
				path: "string"
			});
		}
	}

	updateActivityDetails() {
		this.router.navigate([RouteConstants.CREATEACTIVITY], { queryParams: { aId: this.selectedActivityId } });
	}


	dueDateSetter(selectedOption: any, selectedOptionalDate?: any) {

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

	updateSelectedArchiveStatus() {
		const payload = {
			isArchive: true
		}
		this.confirmationDialogService.open({
			message: `Are you sure you want to archive`
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
						message: "Faild to create Organization! Please try again ",
						action: 'ok'
					})
				})
			}
		})

	}

	deleteSelectedActivity() {
		this.confirmationDialogService.open({
			message: `Are you sure you want to delete `
		}).afterClosed().subscribe((res) => {
			if (res) {
				this.activityService.deleteSelectedActivity(this.selectedActivityId).subscribe(res => {
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
			message: `Are you sure you want to ${currentStatus}`
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
			return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
		}
		);
		let activityDataForDownload = [{
			title: this.activityData.title,
			description: this.activityData.description.replace(/<[^>]*>/g, ""),
			status: this.activityData.status,
			assignedTo: this.selectedActivityAssignedTo.toString(),
			dueDate: this.activityData.dueDate,
			attachments: this.activityData.attachments.length == 0 ? "NO" : this.activityData.attachments[0].name.toString(),
			priority: this.activityData.priority,
			type: this.activityType.toString(),
			sector: this.activitySectorsData.toString(),
			entryType: this.activityEntryType.toString(),
			ministry: this.organizationsInvolved[0].organization,
			scope: this.ActivityScopeData.toString(),
			relatedTo: this.activityRelatedTypesData.toString(),
			categoryMappedTo: "",
			activityprogress: ""
		}];
		activityLogAndDueLog.forEach((element: any, index: number,) => {
			let data = activityDataForDownload[index];
			if (element.dueDate) {
				data.dueDate = element.dueDate
				console.log(element, "dueDte");
				activityDataForDownload = [...activityDataForDownload, data];
				console.log(activityDataForDownload, "updated duedate");
			} else if (element.message) {
				data.description = element?.message.replace(/<[^>]*>/g, ""),
					data.status = element?.status ? element.status : data.status,
					data.priority = element?.priority ? element.priority : data.priority,
					activityDataForDownload = [...activityDataForDownload, data];
			}
		});
		const headersList: { propertyName: string, displayName: string }[] = [
			{
				propertyName: 'title',
				displayName: 'Title'

			},
			{
				propertyName: 'description',
				displayName: 'Description'

			},
			{
				propertyName: 'status',
				displayName: 'Status'

			},
			{
				propertyName: 'assignedTo',
				displayName: 'Assigned To'

			},
			{
				propertyName: 'dueDate',
				displayName: 'Due Date'

			},
			{
				propertyName: 'attachments',
				displayName: 'Attachments'

			},
			{
				propertyName: 'priority',
				displayName: 'Priority'

			},
			{
				propertyName: 'type',
				displayName: 'Type'

			},
			{
				propertyName: 'sector',
				displayName: 'Sector'

			},
			{
				propertyName: 'entryType',
				displayName: 'Entry Type'

			},
			{
				propertyName: 'ministry',
				displayName: 'Ministry/Department'

			},
			{
				propertyName: 'scope',
				displayName: 'Scope'

			},
			{
				propertyName: 'relatedTo',
				displayName: 'Related To'

			},
			// {
			//   propertyName : 'categoryMappedTo',
			//   displayName : 'Category Mapped to'

			// },
			// {
			//   propertyName : 'activityprogress',
			//   displayName : 'Activity % of progress'

			// },
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

}






