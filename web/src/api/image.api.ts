import Config from "../config";

export class ImageFormat {
  m_Name: string;
  m_Hash: string;
  m_Ext: string;
  m_Mime: string;
  m_Width: number;
  m_Height: number;
  m_Size: number;
  m_URL: string;

  public constructor(
    m_Name: string,
    m_Hash: string,
    m_Ext: string,
    m_Mime: string,
    m_Width: number,
    m_Height: number,
    m_Size: number,
    m_URL: string
  ) {
    this.m_Name = m_Name;
    this.m_Hash = m_Hash;
    this.m_Ext = m_Ext;
    this.m_Mime = m_Mime;
    this.m_Width = m_Width;
    this.m_Height = m_Height;
    this.m_Size = m_Size;
    this.m_URL = m_URL;
  }

  public static fromMap = (map: any) => {
    return new ImageFormat(
      map['name'],
      map['hash'],
      map['ext'],
      map['mime'],
      map['width'],
      map['height'],
      map['size'],
      `http://167.86.99.210:1337${map['url']}` // This sucks lol!
    );
  }
};

export class Image {
  public m_Id: number;
  public m_Name: string;
  public m_AlternativeText: string;
  public m_Caption: string;
  public m_Width: number;
  public m_Height: number;
  public m_Formats: {
    thumbnail: ImageFormat,
    large: ImageFormat,
    medium: ImageFormat,
    small: ImageFormat
  };

  public constructor(
    m_Id: number,
    m_Name: string,
    m_AlternativeText: string,
    m_Caption: string,
    m_Width: number,
    m_Height: number,
    m_Formats: {
      thumbnail: ImageFormat,
      large: ImageFormat,
      medium: ImageFormat,
      small: ImageFormat
    }
  ) {
    this.m_Id = m_Id;
    this.m_Name = m_Name;
    this.m_AlternativeText = m_AlternativeText;
    this.m_Caption = m_Caption;
    this.m_Width = m_Width;
    this.m_Height = m_Height;
    this.m_Formats = m_Formats;
  }

  public static fromMap = (map: any): Image => {
    return new Image(
      map['id'],
      map['name'],
      map['alternativeText'],
      map['caption'],
      map['width'],
      map['height'],
      {
        thumbnail: ImageFormat.fromMap(map['formats']['thumbnail']),
        large: ImageFormat.fromMap(map['formats']['large']),
        medium: ImageFormat.fromMap(map['formats']['medium']),
        small: ImageFormat.fromMap(map['formats']['small'])
      }
    )
  };
};