import { Actions, fail } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import FirebaseService from "$lib/firebase/firebaseService";

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

};