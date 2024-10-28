import FirebaseService from "$lib/firebase/firebaseService";
import type { Cookies} from "@sveltejs/kit";
import type { Profile } from "../../../../../app";


export async function load({cookies,params}:{cookies:Cookies,params:Partial<Record<string, string>>,}){
    const user_id = params.slug;
    const firebase = new FirebaseService();
    let user:string|undefined|Profile
    if(user_id == firebase.get_uid()){
        user = cookies.get("Perfil");
        user = JSON.parse(user as string) as Profile;
    }else{
        user = await firebase.get_profile_by_uid(user_id as string);
    }

    const publicaciones = await firebase.get_user_posts(user_id as string);

    return {
        user,
        publicaciones
    }
}