### Description
Learning journey as I go through Ben Awad's youtube playlist for typed graphql backend.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

### Prerequisites
Install redis locally by running the following command:

`brew install redis`

Start redis server like this:

`redis-server /usr/local/etc/redis.conf`

To test if it is working at all, from a different terminal window, try pinging the redis server like this:

`redis-cli ping`

It should respond with a `PONG`

You must have a postgresql server running locally. I am using a mac app from https://postgresapp.com/

Update `ormconfig.json` with correct user, port and password for your local installation.

### Running locally
1. `yarn`
2. `yarn start`