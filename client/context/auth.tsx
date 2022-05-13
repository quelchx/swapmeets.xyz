/** @tsconfig strictNullChecks: false -- warnings were occuring due to user being temporary null */
import Axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthAction, AuthState, ReactChildren } from "../@types";

const StateContext = createContext<AuthState>({
  authenticated: false,
  user: null,
  loading: true,
});

const DispatchContext = createContext(null);

const reducer = (state: AuthState, { type, payload }: AuthAction) => {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        user: payload,
      };
    case "LOGOUT":
      return { ...state, authenticated: false, user: null };
    case "STOP_LOADING":
      return { ...state, loading: false };
    default:
      throw new Error(`Unknow action type: ${type}`);
  }
};

export const AuthProvider = ({ children }: ReactChildren) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  });

  const dispatch = (type: string, payload?: any) =>
    defaultDispatch({ type, payload });

  useEffect(() => {
    async function loadUser() {
      // const storage = localStorage.getItem("current-user");
      // if (storage) {
      //   try {
      //     dispatch("LOGIN", JSON.parse(storage));
      //   } catch (err) {
      //     console.log("Something went wrong fetching user from local storage");
      //   } finally {
      //     dispatch("STOP_LOADING");
      //   }
      // } else {
      try {
        const res = await Axios.get("/auth/current-user");
        // localStorage.setItem("current-user", JSON.stringify(res.data));
        dispatch("LOGIN", res.data);
      } catch (err) {
        console.warn(
          "User is not currently signed in, unable to fetch current user"
        );
      } finally {
        dispatch("STOP_LOADING");
      }
      // }
    }
    loadUser();
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
