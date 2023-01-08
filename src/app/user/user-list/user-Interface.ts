export interface UserSearchCriteria {
    pageNumber: number,
    pageSize: number,
    sortField: string,
    sortOrder: number,
    type: string,
    isActive?: boolean,
    role: string,
    userId: string,
    user:string
}