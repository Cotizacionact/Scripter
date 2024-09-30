import FirebaseService from "$lib/firebase/firebaseService";
import type { Cookies } from "@sveltejs/kit";
import type { Profile } from "../../../../../app";


export async function load({cookies}:{cookies:Cookies}){
    const firebase = new FirebaseService()
    let user:string|undefined|Profile = cookies.get("Perfil")
    user = JSON.parse(user as string) as Profile
    const publicaciones = await firebase.get_user_posts(firebase.get_uid())

    return {
        user,
        publicaciones
    }
}