<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="register">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, db } from "@/firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const register = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // Store user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date()
        });

        alert("User registered successfully!");
      } catch (error) {
        alert("Sign-up failed: " + error.message);
      }
    };

    return { email, password, register };
  },
};
</script>
