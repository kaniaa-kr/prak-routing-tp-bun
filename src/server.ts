// Data statis
const users = [
  { id: 1, name: "Kania", email: "kania@mail.com" },
  { id: 2, name: "Kirani", email: "kirani@mail.com" },
  { id: 3, name: "Igo", email: "igo@mail.com" },
];

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mouse" },
];

// Middleware: menghitung lama eksekusi setiap request
function logRequest(method: string, path: string, startTime: number): void {
  const duration = Date.now() - startTime;
  console.log(`[${new Date().toLocaleTimeString()}] ${method} ${path} — ${duration}ms`);
}

const server = Bun.serve({
  port: 3000,
  fetch(request) {
    const startTime = Date.now(); // catat waktu mulai SEBELUM routing

    // Membuat objek URL untuk memudahkan parsing
    const url = new URL(request.url);
    const path = url.pathname; // hanya path, tanpa query string
    const method = request.method;

    // Routing manual
    if (path === "/" && method === "GET") {
      logRequest(method, path, startTime);
      return new Response(
        `<h1>🏠 Halaman Utama (Bun)</h1><p>Selamat datang di server Bun + TypeScript!</p>`,
        {
          headers: { "Content-Type": "text/html" },
        },
      );
    } else if (path === "/about" && method === "GET") {
      logRequest(method, path, startTime);
      return new Response(
        `<h1>📄 Tentang Kami (Bun)</h1><p>Routing manual dengan Bun sangat mudah!</p>`,
        {
          headers: { "Content-Type": "text/html" },
        },
      );
    } else if (path === "/users" && method === "GET") {
      logRequest(method, path, startTime);
      return new Response(
        JSON.stringify(users),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } else if (path === "/users" && method === "POST") {
      // Untuk POST, kita bisa membaca body jika diperlukan
      // Di sini kita hanya mengembalikan respons sukses
      logRequest(method, path, startTime);
      return new Response(
        JSON.stringify({
          message: `User berhasil dibuat (Bun)`,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        },
      );
    } else if (path.startsWith("/users/") && method === "GET") {
      const id = parseInt(path.split("/")[2] ?? "0");
      const user = users.find((u) => u.id === id);
      logRequest(method, path, startTime);
      if (user) {
        return new Response(JSON.stringify(user), {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response("<h1>❌ 404 - User Tidak Ditemukan (Bun)</h1>", {
          status: 404,
          headers: { "Content-Type": "text/html" },
        });
      }
    } else if (path === "/products" && method === "GET") {
      logRequest(method, path, startTime);
      return new Response(
        JSON.stringify(products),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } else if (path === "/products" && method === "POST") {
      logRequest(method, path, startTime);
      return new Response(
        JSON.stringify({
          message: `Produk berhasil ditambahkan (simulasi)`,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        },
      );
    } else {
      logRequest(method, path, startTime);
      return new Response("<h1>❌ 404 - Halaman Tidak Ditemukan (Bun)</h1>", {
        status: 404,
        headers: { "Content-Type": "text/html" },
      });
    }
  },
});

console.log(`🚀 Server Bun berjalan di http://localhost:${server.port}`);