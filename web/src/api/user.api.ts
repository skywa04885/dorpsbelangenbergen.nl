export class User {
  public m_ID: number;
  public m_Username: string;
  public m_Email: string;
  public m_Provider: string;
  public m_Confirmed: boolean;
  public m_Blocked: boolean;
  public m_Role: number;
  
  public constructor(
    m_ID: number,
    m_Username: string,
    m_Email: string,
    m_Provider: string,
    m_Confirmed: boolean,
    m_Blocked: boolean,
    m_Role: number
  ) {
    this.m_ID = m_ID;
    this.m_Username = m_Username;
    this.m_Email = m_Email;
    this.m_Provider = m_Provider;
    this.m_Confirmed = m_Confirmed;
    this.m_Blocked = m_Blocked;
    this.m_Role = m_Role;
  }

  public static fromMap = (map: any): User => {
    return new User(
      map['id'],
      map['username'],
      map['email'],
      map['provider'],
      map['confirmed'],
      map['blocked'],
      map['role']
    );
  };
}