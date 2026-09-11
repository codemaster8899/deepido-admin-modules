import { createWebHistory, createRouter } from "vue-router";

import TicketIndex from "./views/tickets/index.vue";
import UserIndex from "./views/users/index.vue";
import UserShow from "./views/users/show.vue";
import ClientIndex from "./views/clients/index.vue";
import ClientShow from "./views/clients/show.vue";
import ClientNew from "./views/clients/new.vue";
import ContactIndex from "./views/contacts/index.vue";
import ContactNew from "./views/contacts/new.vue";
import ContactShow from "./views/contacts/show.vue";
import PlaylistsIndex from "./views/playlists/index.vue";
import PlaylistShow from "./views/playlists/show.vue";
import PlaylistHistory from "./views/playlists/history.vue";
import MusicIndex from "./views/music/index.vue";
import DevicesIndex from "./views/devices/index.vue";
import DeviceNew from "./views/devices/new.vue";
import DeviceEdit from "./views/devices/edit.vue";
import spotsIndex from "./views/spots/index.vue";


const router = createRouter({
  history: createWebHistory(`/${I18n.prefix}admin`),
  routes: [
    { path: "/", component: TicketIndex, name: "home" },
    { path: "/users", component: UserIndex, name: "users" },
    { path: "/users/:id", component: UserShow, name: "user" },
    { path: "/clients/", component: ClientIndex, name: "clients" },
    { path: "/clients/new", component: ClientNew, name: "new_client" },
    { path: "/clients/:id", component: ClientShow, name: "client" },
    { path: "/contacts", component: ContactIndex, name: "contacts" },
    { path: "/contacts/new", component: ContactNew, name: "new_contact" },
    { path: "/contacts/:id", component: ContactShow, name: "contact" },
    { path: "/playlists", component: PlaylistsIndex, name: "playlists" },
    { path: "/playlists/:id", component: PlaylistShow, name: "playlist" },
    { path: "/playlists/:id/history", component: PlaylistHistory, name: "playlist_history" },
    { path: "/music", component: MusicIndex, name: "music" },
    { path: "/devices", component: DevicesIndex, name: "devices" },
    { path: "/devices/new", component: DeviceNew, name: "new_devices" },
    { path: "/devices/:id/edit", component: DeviceEdit, name: "edit_devices" },
    { path: "/spots", component: spotsIndex, name: "spots" }
  ],
});

// Handles 404 Not found
router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    window.location.href = "/404";
  } else {
    next();
  }
});

export default router;
