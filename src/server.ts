const server = Bun.serve({
  port: 3000,
  fetch(request) {
    // Membuat objek URL untuk memudahkan parsing
    const url = new URL(request.url);
    const path = url.pathname; // hanya path, tanpa query string
    const method = request.method;

    console.log(`[${new Date().toLocaleTimeString()}] ${method} ${path}`);

    // Routing manual
    if (path === "/" && method === "GET") {
      return new Response(
        `<h1>🏠 Halaman Utama (Bun)</h1><p>Selamat datang di server Bun + TypeScript!</p>`,
        {
          headers: { "Content-Type": "text/html" },
        },
      );
    } else if (path === "/about" && method === "GET") {
      return new Response(
        `<h1>📄 Tentang Kami (Bun)</h1><p>Routing manual dengan Bun sangat mudah!</p>`,
        {
          headers: { "Content-Type": "text/html" },
        },
      );
    } else if (path === "/api/users" && method === "GET") {
      return new Response(
        JSON.stringify([
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
        ]),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } else if (path === "/api/users" && method === "POST") {
      // Untuk POST, kita bisa membaca body jika diperlukan
      // Di sini kita hanya mengembalikan respons sukses
      return new Response(
        JSON.stringify({
          message: `User berhasil dibuat
(Bun)`,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        },
      );
    } else {
      return new Response("<h1>❌ 404 - Halaman Tidak Ditemukan (Bun)</h1>", {
        status: 404,
        headers: { "Content-Type": "text/html" },
      });
    }
  },
});

console.log(`🚀 Server Bun berjalan di http://localhost:${server.port}`);