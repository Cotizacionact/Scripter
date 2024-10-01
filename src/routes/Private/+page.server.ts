import FirebaseService from "$lib/firebase/firebaseService";
import { redirect, type Actions } from "@sveltejs/kit";

export function load(){
    const firebase = new FirebaseService()
    if(!firebase.hasUser()){
        return redirect(302, "/")
    }
}

export const actions:Actions={
    logout: async ({request, cookies}) =>{
        const allCookies = cookies.getAll();
        allCookies.forEach(cookie => {
          cookies.delete(cookie.name, { path: '/Private' });
        });
        new FirebaseService().logout();
        throw redirect(303,"/")

    }
}