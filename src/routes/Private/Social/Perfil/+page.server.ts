import FirebaseService from "$lib/firebase/firebaseService";
import { error, fail, type Actions } from "@sveltejs/kit";
import type { Profile } from "../../../../app";

export const actions:Actions = {
    addAmigo: async ({request, cookies}) =>{
        let perfil:string|undefined|Profile = JSON.parse(cookies.get("Perfil") as string)
        const data = await request.formData();
        const firebase = new FirebaseService();
        const friend_uid = data.get("usuario_id") as string
        function isProfile(perfil:Profile|string|undefined): perfil is Profile{
            if(perfil !=undefined){
                if(typeof perfil != "string"){
                    return perfil.amigos !== undefined
                }else{
                    return false
                }
            }else{
                return false;
            }
        }
        if(isProfile(perfil)){
            try{
                firebase.add_friend(friend_uid,perfil.amigos,perfil.username)
            }catch(error){
                console.error(error)
                return fail(400,{error:true, message:"Hubo un error a la hora de agregar a un amigo"})
            }
        }else{
            console.log("Error: Showing profile")
            console.log(perfil)
            return fail(400,{error:true, message:"Hubo un error a la hora de conseguir tu perfil para la peticion"})
        }
    }
}