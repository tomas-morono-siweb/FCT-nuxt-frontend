export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("auth_token").value;

  // Rutas accesibles sin token
  const publicPaths = new Set<string>(["/login", "/register"]);

  // Si no tenemos token y no está en /login -> redirigir
  if (!token && !publicPaths.has(to.path)) {
    return navigateTo("/login");
  }

  // Si tenemos token y está en /login -> redirigir a home
  if (token && publicPaths.has(to.path)) {
    return navigateTo("/");
  }

  console.log("Middleware auth.global funcionando");
});
