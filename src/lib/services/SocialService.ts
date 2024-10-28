export default class SocialService{
    async add_friend(uid:string){

        const formData = new FormData()
        formData.append("usuario_id",uid)

        await fetch("/Private/Social/Perfil?/addAmigo", {
            method:"POST",
            headers:{
                'x-sveltekit-action': 'true'
            },
            body:formData,
        })
    }

    
}