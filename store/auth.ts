import {
  createUserWithEmailAndPassword,
  User,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const useAuthStore = definePiniaStore("authStore", {
  state: () => {
    return {
      user: null as User | null,
    };
  },
  getters: {
    loggedIn(state): boolean {
      return state.user != null;
    },
    photoUrl(state): string {
      return state.user?.photoURL as string;
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
        const { $auth } = useNuxtApp();
        createUserWithEmailAndPassword($auth, email, password).then(() => {
          updateProfile($auth.currentUser, {
            displayName: `${firstname} ${lastname}`,
            photoURL: `https://ui-avatars.com/api/?name=${firstname}+${lastname}&background=717171&color=fff&size=32&rounded=true`,
          }).then(() => {
            this.user = $auth.currentUser;
          });
        });
        return true;
      } catch (error: unknown) {
        if (error instanceof Error) {
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
      const { $auth } = useNuxtApp();
      try {
        const { user } = await signInWithEmailAndPassword(
          $auth,
          email,
          password
        );
        this.user = user;
        return true;
      } catch (error: unknown) {
        if (error instanceof Error) {
          return false;
        }
      }
      return false;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
