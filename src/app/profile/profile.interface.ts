export interface ProfileSearchCriteria {
    sortField: string,
    type: string,
    profile: string,
    isActive: boolean
}

export interface CreateProfile{
    userId: string,
    Name: string,
    email: string,
    shortName: string,
    timeZone: string,
    profileImage: string
}

export interface UpdateProfileSearchCriteria{
    pageNumber: number,
    pageSize: number,
    sortField: string,
    sortOrder: number,
    type: string,
    isActive: boolean,
    role: string,
    userId: string,
    user:string

}