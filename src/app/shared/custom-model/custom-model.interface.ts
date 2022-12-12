interface Actions {
    id: string | number,
    value: string,
    color:string
    
}
export interface CustomModelData {
    width?: string,
    height? : string,
    header?: string,
    message: string,
    actions: Actions[]
}