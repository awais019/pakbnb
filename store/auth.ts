import {
  createUserWithEmailAndPassword,
  User,
  updateProfile,
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
            photoURL: `https://ui-avatars.com/api/?name=${firstname}+${lastname}&background=0D8ABC&color=fff&size=32`,
          }).then(() => {
            this.user = $auth.currentUser;
          });
        });
        return true;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error);

          return false;
        }
      }
      return false;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
