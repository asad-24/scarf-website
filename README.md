# Monkey Scarfs

A full-stack scarf eCommerce website built only with Next.js App Router, MongoDB Atlas, Mongoose, custom JWT admin authentication, and Cloudinary image uploads.

## Features

- Premium storefront with home, shop, product detail, cart, checkout, and contact pages.
- Products and orders stored in MongoDB Atlas.
- Admin login with an httpOnly JWT cookie.
- Protected admin dashboard for product and order management.
- Cloudinary product image uploads for Vercel-safe persistence.
- Seed script for admin account and sample scarf products.

## Environment Variables

Create `.env.local` in the project root:

```bash
MONGODB_URI="mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/monkey-scarfs?retryWrites=true&w=majority"
JWT_SECRET="replace-with-a-long-random-secret"
ADMIN_EMAIL="owner"
ADMIN_PASSWORD="replace-with-a-secure-password"

CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
CLOUDINARY_URL="cloudinary://API_KEY:API_SECRET@CLOUD_NAME"
```

## MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster.
2. Create a database user with read/write permissions.
3. Add your IP address for local development, or allow Vercel outbound access for deployment.
4. Copy the connection string into `MONGODB_URI`.

## Local Development

```bash
npm install
npm run seed
npm run dev
```

Open `http://localhost:3000`.

Admin login is available at `http://localhost:3000/admin/login` using `ADMIN_EMAIL` as the username and `ADMIN_PASSWORD` as the password after running the seed script.

## Scripts

```bash
npm run dev      # Start local development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
npm run seed     # Seed admin and sample products
```

## Vercel Deployment

1. Push the project to GitHub.
2. Import it into Vercel.
3. Add the same environment variables in Vercel Project Settings.
4. Deploy.
5. Run `npm run seed` locally against the same Atlas database, or run the seed script from a trusted environment before handing the admin dashboard to the store owner.

Cloudinary is required for persistent admin image uploads on Vercel. Local public assets are used only for the seeded sample catalog.
