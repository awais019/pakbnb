import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import User from "~/types/user";

export const useAuthStore = definePiniaStore("authStore", {
  state: () => {
    return {
      user: null as User | null,
    };
  },
  getters: {
    id(state): string {
      return state.user?.objectID as string;
    },
    loggedIn(state): boolean {
      return state.user != null;
    },
    imageUrl(state): string {
      return state.user?.image as string;
    },
    name(state): string {
      return state.user?.name as string;
    },
    email(state): string {
      return state.user?.email as string;
    },
    description(state): string {
      return state.user?.description as string;
    },
  },
  actions: {
    async signup(
      firstname: string,
      lastname: string,
      email: string,
      password: string
    ) {
      try {
        const { $auth, $addUser } = useNuxtApp();
        createUserWithEmailAndPassword($auth, email, password).then(
          async () => {
            const user: User = {
              objectID: $auth.currentUser.uid,
              joined: new Date(),
              name: `${firstname} ${lastname}`,
              email: $auth.currentUser.email as string,
              image: `https://ui-avatars.com/api/?name=${firstname}+${lastname}&background=717171&color=fff&size=128&rounded=true`,
              reviewCount: 0,
              description: "",
              homeId: [],
            };
            await $addUser(user);
            this.user = user;
          }
        );
        return true;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error);
          return false;
        }
      }
      return false;
    },
    async signout() {
      const { $auth } = useNuxtApp();
      $auth.signOut();
      this.user = null;
    },
    async signin(email: string, password: string) {
      const { $auth, $getUserById } = useNuxtApp();
      try {
        const { user } = await signInWithEmailAndPassword(
          $auth,
          email,
          password
        );
        this.user = await $getUserById(user.uid);
        return true;
      } catch (error: unknown) {
        if (error instanceof Error) {
          return false;
        }
      }
      return false;
    },
    async signinWithGoogle() {
      const { $auth, $addUser, $getUserById } = useNuxtApp();
      const provider = new GoogleAuthProvider();
      try {
        const { user } = await signInWithPopup($auth, provider);

        this.user = await $getUserById(user.uid);
        if (!this.user) {
          const newUser: User = {
            objectID: user.uid,
            joined: new Date(),
            name: user.displayName as string,
            email: user.email as string,
            image: user.photoURL as string,
            reviewCount: 0,
            description: "",
            homeId: [],
          };
          await $addUser(newUser);
          this.user = newUser;
        }
        return true;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error);

          return false;
        }
      }
      return false;
    },
    async signinWithFacebook() {
      const { $auth, $getUserById, $addUser } = useNuxtApp();
      const provider = new FacebookAuthProvider();
      try {
        const { user } = await signInWithPopup($auth, provider);
        this.user = await $getUserById(user.uid);
        if (!this.user) {
          const newUser: User = {
            objectID: user.uid,
            joined: new Date(),
            name: user.displayName as string,
            email: user.email as string,
            image: user.photoURL as string,
            reviewCount: 0,
            description: "",
            homeId: [],
          };
          await $addUser(newUser);
          this.user = newUser;
        }
        return true;
      } catch (error: unknown) {
        if (error instanceof Error) {
          return false;
        }
      }
      return false;
    },
    async updateUser(user: any) {
      const { $updateUser } = useNuxtApp();
      await $updateUser(user);
    },
    setUser(user: any) {
      this.user = user;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
