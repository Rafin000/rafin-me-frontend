// Which "site" we're on — rafin.dev vs blog.rafin.dev.
// The blog subdomain is just the public frontend container served at a
// different Host header; the React app checks window.location.hostname
// and swaps routes/links accordingly.

export const MAIN_SITE = 'https://rafin.dev';
export const BLOG_SITE = 'https://blog.rafin.dev';

export const isBlogSubdomain = () =>
  typeof window !== 'undefined' && window.location.hostname.startsWith('blog.');

// Where does a blog post live? On the blog subdomain, at /:id.
// On the main site, at /blogs/:id. (Both work.)
export const blogPath = (id) =>
  isBlogSubdomain() ? `/${id}` : `/blogs/${id}`;
