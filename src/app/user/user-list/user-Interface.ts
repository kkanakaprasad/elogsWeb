export interface UserSearchCriteria {
    pageNumber: number,
    pageSize: number,
    sortField: string,
    sortOrder: number,
    type: string | undefined,
    isActive?: boolean,
    role: string,
    userId: string | undefined,
    user:string,
}

export interface OverDueTaskSearchCriteria{
    pageNumber:number,
    pageSize:number,
    sortField:string,
    sortOrder:number,
    isArchive:false,
    dueDate:any,
    title:string,
    organizations?:string
}

export interface UpComingTaskSearchCriteria{
    pageNumber:0,
    pageSize:5,
    sortField:string,
    sortOrder:number,
    isArchive:false,
    status:["NEW","INPROGRESS"],
    dueDate:any,
    title:string
    organizations?:string
}