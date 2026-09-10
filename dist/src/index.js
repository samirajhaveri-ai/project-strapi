"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register( /* { strapi }: { strapi: Core.Strapi } */) { },
    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    async bootstrap({ strapi }) {
        // Blog content is intentionally public read-only. All create, update and
        // delete operations remain protected behind the Strapi admin panel.
        const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
            where: { type: 'public' },
        });
        if (!publicRole)
            return;
        for (const action of ['api::blog.blog.find', 'api::blog.blog.findOne']) {
            const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
                where: { action, role: publicRole.id },
            });
            if (!existing) {
                await strapi.db.query('plugin::users-permissions.permission').create({
                    data: { action, role: publicRole.id },
                });
            }
        }
    },
};
