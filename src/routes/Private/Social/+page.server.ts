import { type Actions, fail } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import FirebaseService from "$lib/firebase/firebaseService";
import type { Profile } from "../../../app";

export async function load(){
    const firebase = new FirebaseService();
    const publicaciones = await firebase.get_post();

    return {
        publicaciones: publicaciones
    }
}

export const actions: Actions = {

    logout: async ({request}) =>{
        let success:boolean = false
        try {

            const firebase= new FirebaseService();
            await firebase.logout()
            success=true;
        }catch (err){
            console.error(err)
            return fail(400,{error:true,message:"Something went wrong please try again"})
        }finally{
            if(success) throw redirect(303, "/")
        }
        

    },
    Publicacion: async ({request, cookies})=>{
        const data = await request.formData();
        const perfil = JSON.parse(cookies.get("Perfil") as string ) as Profile
        try{
            const firebase = new FirebaseService();
            firebase.create_post(data.get("titulo") as string,data.get("descripción") as string,perfil.username)
        }catch(err){
            console.error(err)
            return fail(400,{error:true,message:"Algo salio mal con tu publicacion"})
        }
    }

};