#!/bin/bash
npm i && npm run build
sudo cp -r ../FCT-nuxt-frontend/ /var/www/
node /var/www/FCT-nuxt-frontend/.output/server/index.mjs
