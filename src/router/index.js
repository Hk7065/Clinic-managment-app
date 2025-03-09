import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Import Views
import LoginView from "@/views/LoginView.vue";  
import DashboardView from "@/views/DashboardView.vue"; 
import SignupView from "@/views/SignupView.vue"; 
// import PatientsView from "@/views/PatientsView.vue";
// import Tokens from "@/views/Tokens.vue";
// import Prescription from "@/views/Prescription.vue";
// import Billing from "@/views/Billing.vue";
// import NotFound from "@/views/NotFound.vue";

// Define Routes
const routes = [
  { path: "/", redirect: "/login" },
  { path: "/dashboard", component: DashboardView },
  { path: "/login", component: LoginView },
  {path: "/Signup", component: SignupView },
  // { path: "/patients", component: PatientsView, meta: { requiresAuth: true } },
  // { path: "/tokens", component: Tokens, meta: { requiresAuth: true } },
  // { path: "/patients/:id/prescription", component: Prescription, meta: { requiresAuth: true } },
  // { path: "/billing", component: Billing, meta: { requiresAuth: true } },
  // { path: "/:pathMatch(.*)*", component: NotFound }, // 404 Page
];

// Create Router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global Navigation Guard for Authentication
const auth = getAuth();

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Check if user is authenticated
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        next("/login"); // Redirect to login if not authenticated
      } else {
        next(); // Proceed if authenticated
      }
    });
  } else {
    next(); // Allow access to non-auth pages (e.g., login)
  }
});

export default router;
