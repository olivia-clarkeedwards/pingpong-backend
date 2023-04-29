# Pingpong Backend

## Build instructions

1. `npm i`
2. `npx dotenv-vault build`
3. login to generate .env file for the Google API routes to function
4. npm run dev

See https://github.com/dotenv-org/dotenv-vault-core for more information on dotenv.

For deployment use `npx dotenv-vault keys` to find the key for `heroku config:set DOTENV_KEY="dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=production"`