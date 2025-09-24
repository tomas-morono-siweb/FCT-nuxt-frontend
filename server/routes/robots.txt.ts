export default defineEventHandler((event) => {
  const rules = ["User-Agent: *", "Disallow: /api/", "Disallow: /_nuxt/", "Disallow: /_ipx/", "Disallow: /_vercel/"];

  setHeader(event, "Content-Type", "text/plain");

  return rules.join("\n");
});
