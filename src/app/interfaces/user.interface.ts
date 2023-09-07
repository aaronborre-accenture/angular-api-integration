export interface IUser{
    id?: string | undefined;
    fullName: string;
    userName: string;
    contactNo: string;
    photo: string;
    createdBy?: Date | string;
    dateCreated?: Date | string;
    email: string;
    description: string;
}