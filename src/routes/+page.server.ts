import { type Actions, fail } from "@sveltejs/kit";
import FirebaseService from "$lib/firebase/firebaseService";
import { redirect } from "@sveltejs/kit";

export async function load(){
    const firebaseService = new FirebaseService();
    if(firebaseService.hasUser()){
        return redirect(302, '/Private/Social');
    }
}

export const actions: Actions = {

    register: async ({request}) =>{
        let flag = true;
        const body = await request.formData()
        const email = body.get("email") as string;
        const username = body.get("nombre") as string;
        const bio = body.get("bio") as string;
        const file = body.get("foto") as File;
        try {
            const firebase= new FirebaseService();
            await firebase.register(email,body.get("password") as string) 
            const img_url = await firebase.upload_image("Perfil", firebase.get_uid(), file)
            if(typeof img_url == "string"){
                await firebase.create_profile(username,img_url,bio)
            }
        }catch (err){
            flag = false;
            console.error(err)
            return fail(400,{email, error:true,message:"Something went wrong please try again"})
        }finally{
            if(flag){
                throw redirect(303, "/Private/Social")
            }
        }
        

    },
}