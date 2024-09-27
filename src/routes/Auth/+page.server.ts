import { Actions, fail } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import FirebaseService from "$lib/firebase/firebaseService";

export const actions: Actions = {

    register: async ({request}) =>{
        const body = await request.formData()
        const email = body.get("email") as string
        try {
            const firebase= new FirebaseService();
            firebase.register(email,body.get("password")as string)

        }catch (err){
            console.error(err)
            return fail(400,{email, error:true,message:"Something went wrong please try again"})
        }finally{
            throw redirect(303, "/Private")
        }
        

    },
    login:async ({request})=>{
        const formData = await request.formData()
        const firebase = new FirebaseService();
        let success:boolean= false;
        const email = formData.get("email");
        try{
            await firebase.login(email as string, formData.get("password") as string )
            success=true;
        }catch(err:any){
            console.log("here")
            if(err["code"]?.includes("invalid-credential")){
                return fail(400,{email, error:true, message:"Invalid username or password"})
            }else{
                return fail(400, {email, error:true ,message:"Something went wrong contact support"})
            }
        }finally{
           if(success) throw redirect(303, "/Private")
        }
        

    }
};