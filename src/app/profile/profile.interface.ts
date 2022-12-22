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
