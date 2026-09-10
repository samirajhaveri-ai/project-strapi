"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
        name: 'strapi::cors',
        config: {
            origin: (ctx) => {
                var _a;
                const origin = ctx.request.header.origin;
                const allowed = ((_a = process.env.CORS_ORIGINS) !== null && _a !== void 0 ? _a : 'http://localhost:4200')
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
exports.default = config;
