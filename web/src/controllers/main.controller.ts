import express from 'express';
import winston from 'winston';
import path from 'path';
import ejs from 'ejs';
import nodemailer from 'nodemailer';
import url from 'url';

import { buildTemplateConfig } from '../render';
import { NieuwsMediaItem, NieuwsMediaCategorie } from '../api/nieuws-media.api';
import { createSimpleLogger } from '../logger';

const logger: winston.Logger = createSimpleLogger('main_controller');
const transporterFrom: string = 'webmaster@fannst.nl';
const transporter = nodemailer.createTransport({
  host: 'fannst.nl',
  port: 25,
  secure: false,
  auth: {
    user: transporterFrom,
    pass: 'Ffeirluke234'
  }
});

const GET_Index = async (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  const nieuwsMedia : NieuwsMediaItem[] = await NieuwsMediaItem.fetchAll (0, 20, undefined);

  buildTemplateConfig('Home', {
    nieuwsMedia
  }, {
    stylesheets: [ 'index.css' ]
  }).then((data: any) => res.render('index.view.ejs', data));
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
    ],
    stylesheets: [ 'ledenpagina.css' ]
  }).then(data => {
    res.render('leden-pagina.view.ejs', data);
  });
};

const GET_Ideebus = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  const query = url.parse(req.url, true).query;

  buildTemplateConfig('Ideeënbus', {
    query
  }, {
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
  const query = url.parse(req.url, true).query;

  buildTemplateConfig('Contact', {
    query
  }, {
    breadcrumb: [
      {
        title: 'Contact',
        href: '/contact'
      }
    ],
    scripts: [ 'contact.js' ],
    stylesheets: [ 'contact.css' ]
  }).then(data => {
    res.render('contact.view.ejs', data);
  });
};

const POST_WordLid = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  const {
    voornaam, voorletters, achternaam,
    adres, postcode, plaats, datum, telefoonnummer,
    mobiel_telefoonnummer, email, raadslidmaatschap,
    bestuurlijke_taak, specifiek, individueel_gesprek,
    groepsgesprek
  } = req.body;

  // Checks if any of the fields is missing.
  if (
    !voornaam || !voorletters || !achternaam || !adres ||
    !postcode || !plaats || !datum || !telefoonnummer ||
    !mobiel_telefoonnummer || !email || !raadslidmaatschap ||
    !bestuurlijke_taak || !specifiek || !individueel_gesprek ||
    !groepsgesprek
  ) {
    return res.redirect (301, '/word-lid')
  }
};

const POST_IdeeBus = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  const { voornaam, achternaam, idee } = req.body;
  
  // Checks if any of the values is missing
  if (!voornaam || !achternaam || !idee) {
    return res.redirect(301, '/ideebus?status=fields-missing');
  }

  // Sends the message to the receiver
  const subject = `Nieuw idee ontvangen van: ${voornaam} ${achternaam}`;
  ejs.renderFile(path.join(process.cwd(), 'templates', 'idee-bus.ejs'), {
    title: subject,
    voornaam, achternaam, idee
  }, (err, html) => {
    if (err) {
      winston.error(err);
      return res.redirect(301, '/ideebus?status=templating-error');
    }

    transporter.sendMail({
      subject: subject, html,
      from: transporterFrom,
      to: 'info@dorpsbelangenbergen.nl'
    }).then(info => {
      res.redirect(301, '/ideebus?status=success');
    }).catch(err => {
      winston.error(err);
      res.redirect(301, '/ideebus?status=sending-error');
    });
  });
}

const POST_Contact = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  const { naam, email, bericht } = req.body;

  // Checks if the required fields are present
  if (!naam || !email || !bericht) {
    return res.redirect(301, '/contact?status=fields-missing');
  }

  const headers: any = {
    'X-Mailer': `Nodemailer, WebAPI (${req.headers["user-agent"] + '; ' ?? ''}for=${req.connection.remoteAddress})`,
    'X-Fannst-Flags': 'mailer=nerror; db=nstore'
  }

  // Sends the client message, this will be sent to the person
  //  who contacted us
  const clientSubject = `Wij hebben uw bericht ontvangen: '${naam}'`;
  ejs.renderFile(path.join(process.cwd(), 'templates', 'contact.ejs'), {
    title: clientSubject,
    naam, bericht, email
  }, (err, html) => {
    if (err) {
      winston.error(err);
      return res.redirect(301, '/contact?status=templating-error');
    }

    transporter.sendMail({
      subject: clientSubject, headers, html,
      from: transporterFrom,
      to: email
    }).then(info => {
      // Sends the email to the admin of dorpsbelangenbergen
      const receiverSubject = `${naam} heeft contact opgenomen !`;
      ejs.renderFile(path.join(process.cwd(), 'templates', 'contact.ejs'), {
        title: receiverSubject,
        naam, bericht, email
      }, (err, html) => {
        if (err) {
          winston.error(err);
          return res.redirect(301, '/contact?status=templating-error');
        }

        transporter.sendMail({
          subject: receiverSubject, headers, html,
          from: transporterFrom,
          to: 'info@dorpsbelangenbergen.nl'
        }).then(info => {
          res.redirect(301, '/contact?status=success');
        }).catch(err => {
          winston.error(err);
          res.redirect(301, '/contact?status=sending-error');
        });
      });
    }).catch(err => {
      winston.error(err);
      res.redirect(301, '/contact?status=sending-error');
    });
  });
};

const GET_NieuwsMedia = async (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  const parsedUrl : url.UrlWithParsedQuery = url.parse (req.url, true);
  const categoryID : number | undefined = parsedUrl.query.cat ? parseInt (<string> parsedUrl.query.cat) : undefined;
  const start : number = parsedUrl.query.s ? parseInt (<string> parsedUrl.query.s) : 0;
  const end : number = parsedUrl.query.e ? parseInt (<string> parsedUrl.query.e) : 10;

  const nieuwsMediaCount : number = await NieuwsMediaItem.count ();
  const nieuwsMedia : NieuwsMediaItem[] = await NieuwsMediaItem.fetchAll (start, end, categoryID);

  buildTemplateConfig('Nieuws / Media', {
    nieuws_media: nieuwsMedia,
    nieuwsMediaCount,
    categoryID,
    start
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

const GET_Hidden_AdminRedirect = (
  req: express.Request, res: express.Response, 
  next: express.NextFunction
) => {
  res.redirect (`http://${req.hostname}:1337/admin`);
};

export { 
  GET_Index, GET_UwPartij, GET_UwPartij_MissieVisie,
  GET_UwPartij_FractieCommissie, GET_UwPartij_Standpunten,
  GET_UwPartij_Dorpen, GET_LedenPagina, GET_PaginaNietGevonden,
  GET_NieuwsMedia, GET_NieuwsItem, GET_Ideebus, GET_WordLid,
  GET_Contact, POST_Contact, POST_IdeeBus, GET_Hidden_AdminRedirect
};
