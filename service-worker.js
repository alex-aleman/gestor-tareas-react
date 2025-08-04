const CACHE_NAME = "gestor-tareas-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/app.css",
  "/app.jsx",
  "/manifest.json",
  "/index.jsx"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener("install", () => console.log("SW instalado"));
self.addEventListener("activate", () => console.log("SW activo"));

self.addEventListener("message", (event) => {
  if (event.data?.type === "SHOW_NOTIFICATION") {
    const { task, status } = event.data;

    const title =
      status === "vencida"
        ? "⚠️ ¡Tarea vencida!"
        : "🔔 Recordatorio de tarea";

    self.registration.showNotification(title, {
      body: `La tarea "${task.text}" ${
        status === "vencida" ? "ya venció" : "vence pronto"
      }.`,
      icon: "mimagenx512.png",
      actions: [{ action: "open", title: "Abrir App" }],
    });

    // 🎵 Reproducir sonido (solo funciona si la app está abierta en segundo plano)
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) =>
        client.postMessage({ type: "PLAY_SOUND" })
      );
    });
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "open") {
    event.waitUntil(clients.openWindow("/"));
  }
});
