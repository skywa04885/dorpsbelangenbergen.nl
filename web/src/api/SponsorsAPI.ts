import Axios from "axios";
import Config from "../config";
import { Image } from "./image.api";

export class Sponsor
{
    public constructor (
        public logo : Image,
        public zichtbaar : boolean,
        public bedrag : number,
        public website : string
    ) {};

    public static fromMap (map : any) : Sponsor
    {
        return new Sponsor (
            Image.fromMap (map['logo']),
            map['zichtbaar'],
            map['bedrag'],
            map['website']
        );
    }
};

export class SponsorsAPI
{
    public static async FetchAll () : Promise <Sponsor[]>
    {
        const response = await Axios.get (Config.buildURI ('/sponsors'));
        if (response.status !== 200)
        {
            throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.data.map ((map : any) => Sponsor.fromMap (map));
    }
};
