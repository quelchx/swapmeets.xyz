/** @tsconfig strictNullChecks: false -- warnings were occuring due to user being temporary null */
import Axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { UserModel } from "../@types";

export interface AuthState {
  user: UserModel | null;
  loading: boolean;
  authenticated: boolean;
}

const StateContext = createContext<AuthState>({
  user: null,
  loading: true,
  authenticated: false,
});

export type AuthAction = {
  payload: any;
  type: string;
};

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
      throw new Error(`Unknown action type: ${type}`);
  }
};

const DispatchContext = createContext(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  });

  const dispatch = (type: string, payload?: any) =>
    defaultDispatch({ type, payload });

  async function loadUser() {
    try {
      const res = await Axios.get("/auth/current-user");
      dispatch("LOGIN", res.data);
    } catch (err) {
      console.warn(
        "User is not currently signed in, unable to fetch current user"
      );
    } finally {
      dispatch("STOP_LOADING");
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {props.children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
