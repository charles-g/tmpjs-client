#### (In progress)
#### This is meant to evaluate a possible workaround for the "booking" use case with Algolia. We build a search engine for temporary jobs.

#### Deployment:
https://tmpjs-client.vercel.app/

#### Context:  

The use case is known to be a challenge for Algolia.

https://discourse.algolia.com/t/search-on-availability-dates/6522  

https://discourse.algolia.com/t/working-with-dates-availability-booking-system/11081/3

As a possible workaround, we index job availabilities (dates) with company context,
group these by company.

As pagination becomes incorrect, we try using infinite hits for a workaround.

#### Tech
* Next.js 14 with app directory / React 18
* Algolia https://www.algolia.com/doc/
* Algolia React InstantSearch https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/
* Tailwind

***

### Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
