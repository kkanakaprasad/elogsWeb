export interface CreateOrganization {
    type: string,
    shortName: string,
    organization: string,
    isActive: true
}

export interface OrganizationSearchCriteria {
    pageNumber: number,
    pageSize: number,
    sortField: string,
    sortOrder: number,
    type: string,
    organization: string,
    isActive: boolean,
    userId:string
}

