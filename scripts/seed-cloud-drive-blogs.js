'use strict';

const { createStrapi } = require('@strapi/strapi');

const relatedPages = 'cloud-drive-file-share-and-sync';
const posts = [
  {
    title: 'Cloud Drive for Teams: Secure File Sharing Without Email Attachments',
    slug: 'cloud-drive-secure-team-file-sharing',
    description:
      'Learn how a managed cloud drive keeps business files organised, synchronised, and securely available to employees wherever they work.',
    content: `## Why email attachments become a problem

When teams exchange documents by email, several copies of the same file quickly appear. Employees may edit an old version, confidential attachments can be forwarded, and nobody knows which copy is final.

## What a business cloud drive changes

A cloud drive provides one controlled location for company files. Authorised users can open the latest version from the office, home, or another branch without carrying data on USB drives.

## Benefits for your team

- One current version of every shared document
- Secure access from approved devices
- Permission controls for folders and teams
- File history and recovery after accidental changes
- Easier collaboration with customers and partners

## Start with clear permissions

Create folders around departments or projects and give access only to employees who need it. Review external sharing links regularly and remove access when a project ends.`,
    author: 'XcellHost Cloud Team',
    date: '2026-08-12',
    time: '17:30:00.000',
    category: 'Cloud Drive',
    relatedPages,
  },
  {
    title: 'Seven Cloud File-Sharing Security Practices Every Business Should Use',
    slug: 'cloud-file-sharing-security-practices',
    description:
      'Use these practical controls to protect shared business files while keeping collaboration simple for employees and external partners.',
    content: `## Collaboration should not weaken security

Cloud file sharing is convenient, but weak permissions and permanent public links can expose sensitive information. A few consistent controls make sharing safer without slowing down the team.

## Seven recommended practices

- Require multi-factor authentication for every user
- Give employees only the folder access they need
- Set expiry dates on external sharing links
- Prevent anonymous public links for sensitive folders
- Remove access promptly when employees or vendors leave
- Enable file-version history and recovery
- Review sharing activity and unusual downloads

## Protect data on every device

Use managed devices where possible, keep operating systems updated, and require screen locks and disk encryption. Remote-wipe capability is valuable when a laptop or phone is lost.

## Review access regularly

A quarterly access review catches old vendor accounts, forgotten project links, and permissions that have expanded over time.`,
    author: 'XcellHost Security Team',
    date: '2026-08-12',
    time: '17:00:00.000',
    category: 'Cloud Drive',
    relatedPages,
  },
];

async function main() {
  const app = await createStrapi({ distDir: './dist' }).load();
  let created = 0;
  let skipped = 0;

  try {
    for (const post of posts) {
      const existing = await app.documents('api::blog.blog').findFirst({
        filters: { slug: { $eq: post.slug } },
      });

      if (existing) {
        skipped += 1;
        continue;
      }

      await app.documents('api::blog.blog').create({ data: post, status: 'published' });
      created += 1;
    }

    console.log(`Cloud Drive blog seed complete: ${created} created, ${skipped} already existed.`);
  } finally {
    await app.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
