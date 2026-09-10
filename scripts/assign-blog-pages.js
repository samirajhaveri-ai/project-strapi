'use strict';

const { createStrapi } = require('@strapi/strapi');

async function main() {
  const app = await createStrapi({ distDir: './dist' }).load();

  try {
    const posts = await app.documents('api::blog.blog').findMany({
      status: 'published',
      pagination: { pageSize: 100 },
    });
    let updated = 0;

    for (const post of posts) {
      const searchable = `${post.title} ${post.category}`.toLowerCase();
      if (!searchable.includes('tally on cloud')) continue;

      await app.documents('api::blog.blog').update({
        documentId: post.documentId,
        data: { relatedPages: 'tally-on-cloud' },
      });
      await app.documents('api::blog.blog').publish({ documentId: post.documentId });
      updated += 1;
    }

    console.log(`Assigned ${updated} Tally blog(s) to tally-on-cloud.`);
  } finally {
    await app.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
