export default defineEventHandler((event) => {
    const params = getRouterParams(event);
    return params.slug;
});