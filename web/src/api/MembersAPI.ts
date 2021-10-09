import { User } from "./user.api";

class Member
{
    public constructor (
        public address : string,
        public postal : string,
        public town : string,
        public date : Date,
        public phone : string | null,
        public mobile : string | null,
        public verified : boolean,
        public notes : string,
        public user : User,
        public firstName : string,
        public middleName : string,
        public lastName : string
    ) {}

    public ToMap () : any
    {
        return {
            address : this.address,
            postal : this.postal,
            town : this.town,
            date : this.date.toString (),
            phone : this.phone,
            mobile : this.mobile,
            verified : this.verified,
            notes : this.notes,
            user : this.user.m_ID,
            first_name : this.firstName,
            middle_name : this.middleName,
            last_name: this.lastName
        };
    }
};

export class MembersAPI
{

}
