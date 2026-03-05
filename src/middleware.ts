import { Elysia, t } from "elysia"
import { openapi } from "@elysiajs/openapi";


const app = new Elysia()
.use(openapi())
// Global Logger
app.onRequest(({ request }) => {
 console.log("📥", request.method, request.url)
 console.log("🕒", new Date().toISOString())
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

app.listen(3000)
console.log("Server running at http://localhost:3000")
