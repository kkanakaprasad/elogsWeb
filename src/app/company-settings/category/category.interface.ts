export interface CreateActivityType {
    name: string,
    shortName: string,   
    isActive: true,
    isDefault: true
}

export interface UpdateActivityType {
    name: string,
    shortName: string,   
    isActive?: true,
    isDefault?: true
}