// app/api/auth/_log/route.js
export async function POST(req) {
    console.log("Someone tried to POST to /api/auth/_log");
    return new Response("Not allowed", { status: 405 });
  }
  