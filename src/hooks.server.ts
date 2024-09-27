import FirebaseService from "$lib/firebase/firebaseService";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle:Handle = async ({event,resolve}):Promise<Response>=>{
    const firebase = new FirebaseService();
    if(!firebase.hasUser() && event.url.pathname.startsWith("/Private")){
        throw redirect(303, "/")
    }
    
    const response = await resolve(event);


    return response
}