import FirebaseService from "$lib/firebase/firebaseService";
import type { Cookies } from "@sveltejs/kit";
import type { User } from "firebase/auth";
import type { Profile } from "../../../app";

export async function load({cookies}:{cookies:Cookies}){
    const firebase = new FirebaseService();
    const user = firebase.get_uid();
    const friend_requests = await firebase.get_friend_requests();
    let perfil:string|undefined|Profile = cookies.get("Perfil")
    let imagen = ""
    if(perfil == undefined || perfil == "undefined"){
        perfil = await firebase.get_profile()
        cookies.set("Perfil",JSON.stringify(perfil), {
            path: '/Private',
        })
        imagen =  perfil?.imagen as string

    }else{
        perfil = JSON.parse(perfil as string) as Profile
        imagen = perfil.imagen
    }
    
    return{
        user: user,
        imagen:imagen,
        friend_requests:friend_requests
    }
}