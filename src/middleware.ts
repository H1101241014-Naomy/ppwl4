import { Elysia, t } from "elysia"
import { openapi } from "@elysiajs/openapi";


const app = new Elysia()
.use(openapi())
// Global Logger
.onRequest(({ request }) => {
 console.log("📥", request.method, request.url)
 console.log("🕒", new Date().toISOString())
})
.onAfterHandle(({ response, request }) => {
    if (request.url.includes("/product")) {
      return {
        success: true,
        Message: "data tersedia",
        data: response
      };
    }
  return response;
})
app.get("/", () => "Hello Middleware")
app.get(
  "/stats",
  () => ({
    total: 100,  
    active: 50
  }),
  {
    response: t.Object({
      total: t.Number(),
      active: t.Number()
    })
  }
);
app.get(
  "/admin",
  () => ({
    stats: 99
  }),
  {
    beforeHandle: ({ request, set }) => {
      const auth = request.headers.get("Authorization");
      if (auth !== "Bearer 123") {
        set.status = 401;
        return {
          success: false,
          message: "Unauthorized"
  };
      }
    },
    response: t.Object({
      stats: t.Number()
    })
  })
.get("/product", () => ({
  id: 1,
  name: "Laptop"
}))
.listen(3000)
console.log("Server running at http://localhost:3000")
