<template>
  <div class="login-container">
    <!-- Left Side (25%) -->
    <div class="left-container">
      <h2>Welcome To Our Clinic Management App</h2>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>

    <!-- Right Side (75%) -->
    <div class="right-container">
      <h2>New to our App?</h2>
      <p>Sign up for free to access all features</p>
      <button @click="$router.push('/signup')">Sign Up</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth } from "@/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "LoginView",
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const login = async () => {
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push("/dashboard"); // Redirect on successful login
      } catch (error) {
        errorMessage.value = "Login failed: " + error.message;
      }
    };

    return { email, password, login, errorMessage };
  },
};
</script>

<style>
/* Layout Styles */
.login-container {
  display: flex;
  width: 100%;
  height: 100vh;
}

/* Left container (25%) */
.left-container {
  width: 25%;
  background: #007bff;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* Right container (75%) */
.right-container {
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Form styling */
input {
  display: block;
  width: 80%;
  padding: 10px;
  margin: 10px 0;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

/* Error Message */
.error {
  color: red;
  margin-top: 10px;
}
</style>
