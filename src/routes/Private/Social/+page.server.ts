import { type Actions, fail, json } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import FirebaseService from "$lib/firebase/firebaseService";
import type { Profile } from "../../../app";

export async function load(){
    const firebase = new FirebaseService();
    const publicaciones = await firebase.get_post();
    const post_ids = publicaciones.map((doc)=>{return doc.id})
    console.log(await firebase.get_likes(post_ids))
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
    },
    Comentario: async ({request, cookies})=>{
        const data = await request.formData();
        const perfil = JSON.parse(cookies.get("Perfil") as string ) as Profile;
        const firebase = new FirebaseService();
        try{
            const comment_id = await firebase.create_comment(perfil.username,data.get("text") as string, data.get("Post ID") as string, Number(data.get("Comentarios") as string));
            const uid = firebase.get_uid()
            console.log(perfil.username)
            return {
                comment_id,
                username:perfil.username,
                user_id:uid
            }
        }catch(err){
            console.error(err)
            return fail(400,  {error:true,message:"Algo salio mal con tu comentario"})
        }
    },
    getComentarios: async ({request, cookies})=>{
        const data = await request.formData();
        const firebase = new FirebaseService();
        try{
            const comentarios = await firebase.get_comments(data.get("Post ID") as string)
           return JSON.stringify(comentarios)
            //return new Response({comentarios:JSON.stringify(comentarios)})
        }catch(err){
            console.error(err);
            return fail(400, {error:true,message:"Algo salio mal cargando los comentarios"})
        }
    },
    Like: async ({request, cookies})=>{
        const data = await request.formData();
        const perfil = JSON.parse(cookies.get("Perfil") as string ) as Profile;
        const first_likes = JSON.parse(data.get("First Likes") as string)
        if(first_likes.length<6){
            first_likes.push({usuario:perfil.username})
        }
        const firebase = new FirebaseService();
        try{

            firebase.handle_like()
            
        }catch(err){
            console.error(err)
        }
    }

};