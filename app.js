const express = require('express');
const app = express();
require('./db/connection');
const authRoute = require('./routers/router');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { object } = require('joi');
const Passport = require('./config/passport');
const session = require('express-session');
const passport = require('passport');

app.set("view engine", "hbs");
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api',authRoute);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

//passport middleware
// app.use(passport.initialize());
 
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Role based API',
            version: '1.0.0',
            description: 'This is a simple role based document using swagger.'
        },
        servers: [
            {   
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],  
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer'
            }
          }
        },
        security: {
          bearerAuth: []
        }

       },
       apis: ['./routers/*.js']
    }



const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(port , ()=>{
    console.log("Port 3000 is listening...")
})





// apiKey: {
            //   type: 'apiKey',
            //   in: 'header',
            //   name: 'X-API-KEY'
            // },
            // appId: {
            //   type: 'apiKey',
            //   in: 'header',
            //   name: 'X-APP-ID'
            // }