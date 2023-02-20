const app = Vue.createApp({});

import Locations from "./components/Locations.js";
import LocationByID from "./components/LocationByID.js";
import UpdateLocation from "./components/UpdateLocation.js";
import UpdatePlace from "./components/UpdatePlace.js";

const Home = { template: '<div>Home</div>' }

const routes = [
    { path: '/', component: Home },
    { path: '/locations', component: Locations, props: true },
    { path: '/locations/:slug(\\d+)', component: LocationByID},
    { path: '/locations/updateLocation/:slug(\\d+)', component: UpdateLocation},
    { path: '/Places/updatePlace/:slug(\\d+)', component: UpdatePlace},

]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

export default router;

app.use(router);

app.mount("#app");