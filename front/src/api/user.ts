import { UsersResponse } from "../types/user";
import { authFetch } from "./authFetch";

export const getUsers= async() :Promise<UsersResponse >=>{
    return authFetch("auth/users",{
        method:"GET",
    })
};