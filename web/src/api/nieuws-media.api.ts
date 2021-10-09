import Config from '../config';
import axios from 'axios';
import showdown from 'showdown';

const converter: showdown.Converter = new showdown.Converter();

import { Image, ImageFormat } from './image.api';
import { User } from './user.api';

export class NieuwsMediaItem {
  public m_ItemTitel: string;
  public m_ItemContent: string;
  public m_ItemDate: Date;
  public m_Categorie: NieuwsMediaCategorie | null;
  public m_ItemImages: Image[];
  public m_ItemThumbnail: Image;
  public m_User: User | null;
  public m_ID: number;

  public constructor(
    m_ItemTitel: string,
    m_ItemContent: string,
    m_ItemDate: Date,
    m_Categorie: NieuwsMediaCategorie | null,
    m_ItemImages: Image[],
    m_ItemThumbnail: Image,
    m_User: User | null,
    m_ID: number
  ) {
    this.m_ItemTitel = m_ItemTitel;
    this.m_ItemContent = m_ItemContent;
    this.m_ItemDate = m_ItemDate;
    this.m_Categorie = m_Categorie;
    this.m_ItemImages = m_ItemImages;
    this.m_ItemThumbnail = m_ItemThumbnail;
    this.m_User = m_User;
    this.m_ID = m_ID;
  }

  public static fromMap = (map: any): NieuwsMediaItem => {
    return new NieuwsMediaItem(
      map['item_titel'],
      map['item_content'],
      map['item_datum'],
      NieuwsMediaCategorie.fromMap(map['nieuws_media_category']),
      [ Image.fromMap(map['item_images']) ],
      Image.fromMap(map['item_thumbnail']),
      User.fromMap(map['user']),
      map['id']
    );
  };

  public static fetchByID = (id: number): Promise<NieuwsMediaItem> => {
    return new Promise<NieuwsMediaItem>((resolve, reject) => {
      axios.get(Config.buildURI(`/nieuws-medias/${id}`)).then(response => {
        if (response.status !== 200)
          return reject(`${response.status}: ${response.statusText}`);

        let item: NieuwsMediaItem = NieuwsMediaItem.fromMap(response.data);
        item.m_ItemContent = converter.makeHtml(item.m_ItemContent);
        resolve(item);
      }).catch(err => reject(err));
    });
  };

  public static async count (): Promise <number> {
    const response = await axios.get (Config.buildURI ('/nieuws-medias/count'));
    if (response.status !== 200)
    {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return parseInt (response.data);
  };

  public static async fetchAll (start: number, limit: number, category : number | undefined): Promise<NieuwsMediaItem[]> {
    const response = await axios.get (Config.buildURI(`/nieuws-medias?_sort=item_datum:DESC&_start=${start}&_limit=${limit}${category !== undefined ? '&nieuws_media_category=' + category : ''}`));
    if (response.status !== 200)
    {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response.data.map((map: any) => NieuwsMediaItem.fromMap(map));
  };
}

export class NieuwsMediaCategorie {
  public m_CategorieNaam: string;
  public m_CategorieInNavigatie: boolean;
  public m_CategorieID: number;

  public constructor(
    m_CategorieNaam: string, m_CategorieInNavigatie: boolean,
    m_CategorieID: number
  ) {
    this.m_CategorieNaam = m_CategorieNaam;
    this.m_CategorieInNavigatie = m_CategorieInNavigatie;
    this.m_CategorieID = m_CategorieID;
  }

  public static fromMap = (map: any): NieuwsMediaCategorie | null => {
    if (!map)
    {
      return null;
    }
    
    return new NieuwsMediaCategorie(
      map['categorie_naam'],
      map['categorie_in_navigatie'],
      map['id']
    );
  };
  
  public static fetchAll = (): Promise<NieuwsMediaCategorie[]> => {
    return new Promise<NieuwsMediaCategorie[]>((resolve, reject) => {
      axios.get(Config.buildURI('/nieuws-media-categories')).then(response => {
        if (response.status !== 200)
          return reject(`${response.status}: ${response.statusText}`);
        
        resolve(response.data.map((map: any) => NieuwsMediaCategorie.fromMap(map)));
      }).catch(err => reject(err));
    });
  }
}
