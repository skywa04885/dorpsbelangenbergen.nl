import Axios from "axios";
import Config from "../config";
import { User } from "./user.api";

export class Member
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
        public firstName : string,
        public middleName : string,
        public lastName : string,
        public email : string,
        public id ?: number
    ) {}

    public ToMap () : any
    {
        return {
            address : this.address,
            postal : this.postal,
            town : this.town,
            date : this.date.toISOString(),
            phone : this.phone,
            mobile : this.mobile,
            verified : this.verified,
            notes : this.notes,
            first_name : this.firstName,
            middle_name : this.middleName,
            last_name : this.lastName,
            email : this.email,
            id : this.id
        };
    }
};

export class MembersAPI
{
    public static async Save (member : Member) : Promise <void>
    {
        const response = await Axios.post (Config.buildURI ('/members'), member.ToMap ());
        if (response.status !== 200)
        {
            throw new Error(`${response.status}: ${response.statusText}`);
        }

        // Sets the ID in the member.
        member.id = response.data.id;
    }
}
