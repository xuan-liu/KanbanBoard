import Vue from "vue";
import Router from "vue-router";
import Details from "./views/Details.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/details",
            name: "details",
            component: Details
        }
    ]
})

