'use strict';

const { createStrapi } = require('@strapi/strapi');

const posts = [
  {
    title: 'Tally on Cloud: A Practical Guide for Growing Businesses',
    slug: 'tally-on-cloud-practical-guide',
    description: 'Learn how Tally on Cloud gives your accounts team secure, anytime access without maintaining an office server.',
    author: 'XcellHost Cloud Team',
    date: '2026-08-12',
    time: '10:00:00.000',
    category: 'Tally on Cloud',
    content: `## Why businesses move Tally to the cloud

Tally on Cloud lets authorised employees use the same company data securely from the office, home, or another branch. The application remains familiar while the server, backups, and availability are managed centrally.

## Key advantages

- Access Tally from anywhere with an internet connection
- Keep all users on one current company dataset
- Reduce dependence on office hardware and local power
- Schedule backups and strengthen access controls

## Is it right for your organisation?

It is especially useful for businesses with multiple accountants, remote teams, branches, or management that needs reports while travelling.`,
  },
  {
    title: 'GST Compliance Checklist for Indian Businesses',
    slug: 'gst-compliance-checklist',
    description: 'A straightforward monthly checklist to help accounts teams prepare accurate GST returns and avoid preventable mismatches.',
    author: 'Priya Sharma',
    date: '2026-08-11',
    time: '15:30:00.000',
    category: 'GST',
    content: `## Start with clean source data

Review sales invoices, purchase invoices, debit notes, and credit notes before beginning return preparation. Correct GSTINs and tax rates at the source instead of adjusting totals at the end.

## Monthly checks

- Reconcile sales with GSTR-1
- Compare purchase records with GSTR-2B
- Review reverse-charge transactions
- Confirm eligible input tax credit
- Keep supporting documents organised

## Build a repeatable process

A documented checklist and a clear reviewer reduce last-minute corrections and make every filing cycle easier to audit.`,
  },
  {
    title: 'Five Accounting Reports Every Business Owner Should Review',
    slug: 'essential-accounting-reports',
    description: 'These five reports turn day-to-day accounting entries into useful signals about profitability, cash flow, and business health.',
    author: 'Rahul Mehta',
    date: '2026-08-10',
    time: '09:15:00.000',
    category: 'Accounting',
    content: `## Reports that support better decisions

Accounting is most valuable when the numbers are reviewed regularly. A short monthly review can reveal collection problems, unusual costs, and cash pressure early.

## The five reports

- Profit and loss statement
- Balance sheet
- Cash-flow statement
- Accounts receivable ageing
- Accounts payable ageing

## Review trends, not only totals

Compare each report with the previous month and the same period last year. Trends usually explain more than a single closing balance.`,
  },
  {
    title: 'Payroll Processing: A Month-End Checklist for HR Teams',
    slug: 'payroll-month-end-checklist',
    description: 'Use this practical payroll checklist to validate attendance, deductions, approvals, payments, and employee records before payday.',
    author: 'Neha Kapoor',
    date: '2026-08-09',
    time: '11:45:00.000',
    category: 'Payroll',
    content: `## Prepare before payroll day

Collect attendance, leave, overtime, new-joiner, and exit information before the payroll cut-off. Late inputs are the most common reason for corrections.

## Validation checklist

- Confirm employee master-data changes
- Validate attendance and approved leave
- Check statutory and voluntary deductions
- Review incentive and reimbursement approvals
- Reconcile the bank-payment total with the payroll register

## After processing

Distribute payslips securely and retain approval records. Restrict payroll data to employees who genuinely need access.`,
  },
  {
    title: 'How Cloud Backup Protects Business Accounting Data',
    slug: 'cloud-backup-accounting-data',
    description: 'Understand why off-site backups, retention policies, and restore tests are essential for protecting financial information.',
    author: 'XcellHost Security Team',
    date: '2026-08-08',
    time: '14:20:00.000',
    category: 'Data Protection',
    content: `## A backup must survive the original incident

A copy stored beside the production system can be damaged by the same hardware failure, ransomware attack, or human mistake. An off-site copy creates a separate recovery path.

## A sound backup plan includes

- Automated backup schedules
- Encryption in transit and at rest
- Multiple retention points
- Restricted deletion permissions
- Regular restore testing

## Recovery is the real measure

The purpose of backup is not to create files; it is to restore operations. Test a complete recovery before an emergency occurs.`,
  },
  {
    title: 'Choosing the Right Tally on Cloud Plan',
    slug: 'choosing-tally-cloud-plan',
    description: 'A simple framework for selecting users, resources, security, and support for a dependable Tally cloud environment.',
    author: 'Amit Desai',
    date: '2026-08-07',
    time: '16:00:00.000',
    category: 'Tally on Cloud',
    content: `## Begin with actual usage

Count concurrent users rather than total employees. Note the number of companies, expected data size, custom TDLs, and other applications that must run alongside Tally.

## Questions to ask

- How many people work at the same time?
- Do users connect from several locations?
- What backup frequency is included?
- Is support available during your working hours?
- How quickly can resources be increased?

## Plan for peak periods

Choose an environment that can handle audit and filing-season workloads without paying for unnecessary capacity throughout the year.`,
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

    console.log(`Blog seed complete: ${created} created, ${skipped} already existed.`);
  } finally {
    await app.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
