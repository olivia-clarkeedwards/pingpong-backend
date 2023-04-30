# Pingpong Backend

## Build instructions

1. `npm i`
2. `npm run knex migrate:latest`
3. `npm run knex seed:run`
2. To obtain the API key for the location data run `npx dotenv-vault build`
3. Login to generate .env file
4. npm run dev

See https://github.com/dotenv-org/dotenv-vault-core for more information on dotenv.

For deployment use `npx dotenv-vault keys` to find the key for `heroku config:set DOTENV_KEY="dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=production"`