import express from 'express';

import * as controller from '../controllers/main.controller';

// Creates the express router, which will later
//  be exported for usage in the main method
const Router = express.Router();

Router.get('/uw-partij', controller.GET_UwPartij);
Router.get('/uw-partij/missie-visie', controller.GET_UwPartij_MissieVisie);
Router.get('/uw-partij/fractie-commissie', controller.GET_UwPartij_FractieCommissie);
Router.get('/uw-partij/standpunten', controller.GET_UwPartij_Standpunten);
Router.get('/uw-partij/dorpen', controller.GET_UwPartij_Dorpen);

Router.get('/nieuws-media', controller.GET_NieuwsMedia);
Router.get('/nieuws-media/:id', controller.GET_NieuwsItem);

Router.get('/ideebus', controller.GET_Ideebus);
Router.post('/ideebus', controller.POST_IdeeBus);
Router.get('/leden-pagina', controller.GET_LedenPagina);
Router.get('/word-lid', controller.GET_WordLid);
Router.post ('/word-lid', controller.POST_WordLid);
Router.get('/contact', controller.GET_Contact);
Router.post('/contact', controller.POST_Contact);
Router.get('/', controller.GET_Index);
Router.get ('/hidden/admin-redirect', controller.GET_Hidden_AdminRedirect);
Router.get ('/sponsors', controller.GET_Sponsors);

Router.get('*', controller.GET_PaginaNietGevonden);

export default Router;
