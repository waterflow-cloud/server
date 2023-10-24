# WATERFLOW

<div align="center">
<img height="120px" width="120px" src="./assets/logo.svg"/>
<p> The Lightweight Web equipment for media-service</p>
</div>

## Description

The **waterflow** is a **Lightweight** web-service equipment for media-storage and pre-processing in zzkpnews website. It's used for streaming media, static media processing.

## Installation

```bash
$ npm install
```

Otherwise the application use `ffmpeg` tools to process video resource and you are supposed to pre-install it manually. \
See on [FFmpeg website.](https://ffmpeg.org/download.html)

## Running the app

```bash
# development
npm run start

# watch mode for development
npm run start:dev

# production mode
npm run start:prod
```

For better running in production mode, we recommend using the process daemon tool `pm2`. \
First, install the pm2

```bash
npm i pm2 -g
```

Then start the process instance for waterflow by pm2

```bash
pm2 start npm --name waterflow -- run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API and Usage

**TODO: Finish this part after design works.**

## License

waterflow is [MIT licensed](LICENSE).
