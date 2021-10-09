import Config from './config';
import { NieuwsMediaCategorie } from './api/nieuws-media.api';

const buildTemplateConfig = (title: string, vars: any = {}, config: {
  description?: string, keywords?: string[], author?: string,
  stylesheets?: string[], breadcrumb?: { title: string, href: string }[],
  scripts?: string[]
} = {}): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    NieuwsMediaCategorie.fetchAll().then(nm_categ => {
      resolve(Object.assign({
        meta: {
          title,
          seo_title: title, 
          seo_description: config.description ?? `Deze pagina '${title}' heeft geen specifieke beschijving`,
          seo_keywords: [ 'dorpsbelangen', 'bergen', 'limburg', 'politiek', 'partij',  ].concat(config.keywords ?? []),
          seo_author: config.author ?? 'Luke A.C.A. Rieff (webmaster@fannst.nl)',
          seo_generator: 'NodeJS with Strapi CMS',
          lang: 'nl'
        },
        scripts: ((config.scripts ?? []).concat ([ 'default.js' ]).map (script => {
          if (script.startsWith ("http://") || script.startsWith ("https://"))
          {
            return script;
          }

          return '/dist/scripts/' + script + (Config.dev ? '?dr=' + (Math.random() * 12).toString(16).substring(2) : '');
        })),
        stylesheets: [ 'reset.css', 'default.css', 'ui.css' ].concat(config.stylesheets ?? []),
        dev: Config.dev,
        nav: {
          breadcrumb: [
            {
              title: 'Home',
              href: '/'
            }
          ].concat(config.breadcrumb ?? []),
          pages: [
            {
              title: 'Home',
              href: '/'
            }, {
              title: 'Uw Partij',
              href: '/uw-partij',
              sub_pages: [
                {
                  title: 'Missie / Visie',
                  href: '/uw-partij/missie-visie'
                }, /*{
                  title: 'Fractie / Commissie',
                  href: '/uw-partij/fractie-commissie'
                },*/ {
                  title: 'Standpunten',
                  href: '/uw-partij/standpunten'
                }, {
                  title: 'Dorpen',
                  href: '/uw-partij/dorpen'
                }
              ]
            }, {
              title: 'Ledenpagina',
              href: '/leden-pagina'
            }, {
              title: 'Nieuws / Media',
              href: '/nieuws-media',
              sub_pages: nm_categ.filter(categ => categ.m_CategorieInNavigatie).map(categ => {
                return {
                  title: categ.m_CategorieNaam,
                  href: `/nieuws-media?cat=${categ.m_CategorieID}`
                }
              })
            }, {
              title: 'Ideeënbus',
              href: '/ideebus'
            }, {
              title: 'Word lid',
              href: '/word-lid'
            }, {
              title: 'Contact',
              href: '/contact'
            }, {
              title: 'Doneren',
              href: '#donate'
            }
          ]
        }
      }, vars));
    });
  });
};

export { buildTemplateConfig };