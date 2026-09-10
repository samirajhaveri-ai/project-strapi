import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: (ctx: { request: { header: { origin?: string } } }) => {
        const origin = ctx.request.header.origin;
        const allowed = (process.env.CORS_ORIGINS ?? 'http://localhost:4200')
          .split(',')
          .map((value) => value.trim());

        return origin && allowed.includes(origin) ? origin : allowed[0];
      },
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
