export default class Config {
  static dev: boolean = true;
  static cms_url: string = 'localhost:1337';
  static cms_ssl: boolean = false;

  static buildURI = (path: string) => {
    if (path[0] !== '/') path = `/${path}`;
    return `${(Config.cms_ssl ? 'https' : 'http')}://${Config.cms_url}${path}`;
  }
}
