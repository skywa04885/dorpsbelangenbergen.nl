import express from 'express';
import winston from 'winston';

import { buildTemplateConfig } from '../render';
import { NieuwsMediaItem, NieuwsMediaCategorie } from '../api/nieuws-media.api';
import { createSimpleLogger } from '../logger';

const logger: winston.Logger = createSimpleLogger('main_controller');

const GET_Index = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  buildTemplateConfig('Home').then((data: any) => res.render('index.view.ejs', data));
};

const GET_UwPartij = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  buildTemplateConfig('Uw partij', null, {
    breadcrumb: [
      {
        title: 'Uw partij',
        href: '/uw-partij'
      }
    ]
  }).then(data => {
    res.render('uw-partij/index.view.ejs', data);
  });
};

const GET_UwPartij_MissieVisie = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  buildTemplateConfig('Missie / Visie', null, {
    breadcrumb: [
      {
        title: 'Uw partij',
        href: '/uw-partij'
      }, {
        title: 'Missie / Visie',
        href: '/uw-partij/missie-visie'
      }
    ]
  }).then(data => {
    res.render('uw-partij/missie-visie.view.ejs', data);
  });
};

const GET_UwPartij_FractieCommissie = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  buildTemplateConfig('Fractie / Commissie', null, {
    breadcrumb: [
      {
        title: 'Uw partij',
        href: '/uw-partij'
      }, {
        title: 'Fractie / Commissie',
        href: '/uw-partij/fractie-commissie'
      }
    ]
  }).then(data => {
    res.render('uw-partij/missie-visie.view.ejs', data);
  });
};

const GET_UwPartij_Standpunten = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  buildTemplateConfig('Standpunten', null, {
    breadcrumb: [
      {
        title: 'Uw partij',
        href: '/uw-partij'
      }, {
        title: 'Standpunten',
        href: '/uw-partij/standpunten'
      }
    ]
  }).then(data => {
    res.render('uw-partij/standpunten.view.ejs', data);
  });
};

const GET_UwPartij_Dorpen = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  buildTemplateConfig('Dorpen', null, {
    breadcrumb: [
      {
        title: 'Uw partij',
        href: '/uw-partij'
      }, {
        title: 'Dorpen',
        href: '/uw-partij/dorpen'
      }
    ]
  }).then(data => {
    res.render('uw-partij/dorpen.view.ejs', data);
  });
};

const GET_LedenPagina = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  buildTemplateConfig('Ledenpagina', null, {
    breadcrumb: [
      {
        title: 'Ledenpagina',
        href: '/leden-pagina'
      }
    ]
  }).then(data => {
    res.render('leden-pagina.view.ejs', data);
  });
};

const GET_Ideebus = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  buildTemplateConfig('Ideeënbus', null, {
    breadcrumb: [
      {
        title: 'Ideeënbus',
        href: '/idee-bus'
      }
    ],
    stylesheets: [ 'idee-bus.css' ]
  }).then(data => {
    res.render('idee-bus.view.ejs', data);
  });
};

const GET_WordLid = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  buildTemplateConfig('Word lid', null, {
    breadcrumb: [
      {
        title: 'Word lid',
        href: '/word-lid'
      }
    ]
  }).then(data => {
    res.render('word-lid.view.ejs', data);
  });
};

const GET_Contact = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  buildTemplateConfig('Contact', null, {
    breadcrumb: [
      {
        title: 'Contact',
        href: '/contact'
      }
    ]
  }).then(data => {
    res.render('contact.view.ejs', data);
  });
};

const GET_NieuwsMedia = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  NieuwsMediaItem.fetchAll(0, 20).then(nieuws_media => {
    buildTemplateConfig('Nieuws / Media', {
      nieuws_media
    }, {
      breadcrumb: [
        {
          title: 'Nieuws / Media',
          href: '/nieuws-media'
        }
      ],
      stylesheets: [ 'nieuws-media.css' ]
    }).then(data => {
      res.render('nieuws-media.view.ejs', data);
    });
  }).catch(err => console.error(err));
};
const GET_NieuwsItem = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  NieuwsMediaItem.fetchByID(parseInt(req.params.id)).then(artikel => {
    buildTemplateConfig('Nieuws / Media', {
      artikel
    }, {
      breadcrumb: [
        {
          title: 'Nieuws / Media',
          href: '/nieuws-media'
        }
      ],
      stylesheets: [ 'nieuws-media-item.css' ]
    }).then(data => {
      res.render('nieuws-media-item.view.ejs', data);
    });
  }).catch(err => res.redirect('/nieuws-media'));
};

const GET_PaginaNietGevonden = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  buildTemplateConfig('404 Pagina niet gevonden', {
    code: 404,
    message: 'De opgevraagde pagina kon niet worden gevonden',
    info: {
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      path: req.path,
      hostname: req.hostname,
      timestamp: new Date().toString()
    }
  }, {
    stylesheets: [ 'error.css' ],
    breadcrumb: [
      {
        title: '404 Pagina niet gevonden',
        href: req.path
      }
    ]
  }).then(data => {
    res.render('error.view.ejs', data);
  });
};

export { 
  GET_Index, GET_UwPartij, GET_UwPartij_MissieVisie,
  GET_UwPartij_FractieCommissie, GET_UwPartij_Standpunten,
  GET_UwPartij_Dorpen, GET_LedenPagina, GET_PaginaNietGevonden,
  GET_NieuwsMedia, GET_NieuwsItem, GET_Ideebus, GET_WordLid,
  GET_Contact
};