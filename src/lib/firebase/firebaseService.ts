import {getApps, initializeApp, type FirebaseApp} from "firebase/app"
import {collection, Firestore, getDocs, getFirestore, doc, getDoc, query, where, setDoc, addDoc, updateDoc, runTransaction, Transaction} from "firebase/firestore"
import {firebaseConfig} from "../../env"
import {type Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User} from "firebase/auth"
import { redirect } from "@sveltejs/kit"
import type { Comment, Friend_Request, Like, Post, Profile } from "../../app"
import { type FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes, type UploadResult } from "firebase/storage"

export default class FirebaseService{
    private static instance: FirebaseService;
    private app:FirebaseApp
    private db:Firestore
    private auth:Auth
    private storage:FirebaseStorage;
    private user:User|undefined|null;

    constructor(){
       if(getApps().length!=0){
        this.app= getApps()[0]
       }else{
        this.app = initializeApp(firebaseConfig);
       }
        this.db = getFirestore(this.app);
        this.auth = getAuth(this.app);
        this.storage = getStorage(this.app);
        this.user = this.auth.currentUser
    }

    public get_uid():string{
        return this.user?.uid as string
    }

    public async login(email:string,password:string):Promise<void>{
        try{
            await signInWithEmailAndPassword(this.auth,email,password);
            onAuthStateChanged(this.auth,(user:User|null)=>{
                this.user = user;
            },(error:Error)=>{throw new Error(error.message)})

        }catch(err){
            throw err
        }
    }

    public async register(email:string,password:string):Promise<void>{
        try{
            await createUserWithEmailAndPassword(this.auth,email,password);
            onAuthStateChanged(this.auth,(user:User|null)=>{
                this.user=user;   
            },(error:Error)=>{throw new Error(error.message)})

        }catch(err){
            throw err
        }
    }

    public async logout():Promise<void>{
        await signOut(this.auth);
        this.user=null;
    }

    public hasUser():boolean{
        return !(this.user==undefined && this.user==null)
    }

    public static CreateUID(length:number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!#$%&()=?¡¿+-^{}[]:;.,|';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    }


    public async create_post(titulo:string, descripcion:string, username:string){
        await setDoc(doc(this.db,"Post", FirebaseService.CreateUID(15)),{
            comentarios:0,
            descripcion:descripcion,
            titulo:titulo,
            usuario:username,
            usuario_id:this.get_uid(),
            likes:0
        })
        
    }

    public async create_comment(username: string, text: string, post_id: string, comentarios_num: number) {
        const db = this.db;
        const postRef = doc(db, "Post", post_id);
        const comentariosRef = collection(postRef, "comentarios");
        let comment_id = ""
    
        try {
            await runTransaction(db, async (transaction:Transaction) => {
                // Update the comment count
                const postDoc = await transaction.get(postRef);
                if (!postDoc.exists()) {
                    throw "Post does not exist!";
                }
                // Add the comment
                comment_id= FirebaseService.CreateUID(15)
                transaction.set(doc(comentariosRef,comment_id),
                {
                    usuario: username,
                    usuario_id: this.get_uid(),
                    texto: text,
                    likes: 0,
                    comentarios: false
                }
            )
              
    
                const newCommentCount = comentarios_num + 1;
                transaction.update(postRef, { comentarios: newCommentCount });
            });
    
            return comment_id
        } catch (error) {
            console.error("Transaction failed: ", error);
            throw new Error("Error al crear comentario")
        }
    }

    public async handle_like(post_id:string, previous_likes:number,first_likes:Like[]):Promise<boolean|void>{
        /**
         * This function could be imporved by passing the id of the like to avoid the query
         * Additionally passing as a parameter if the post is liked would save 1 query from being made
         * Function designed to manage weather a like is added or deleted from the database
         *  @param post_id : id of the post to for which the like should be toggled
         *  @returns true if the post is liked, false if a like was removed
         */
        try{
            let liked = false

            await runTransaction(this.db,async (transaction:Transaction)=>{
                const posts = await getDocs(query(collection(this.db, "Like"),where("postId", "==", post_id),where("usuario_id", "==", this.get_uid())))
                const post_array = posts.docs.map(doc => doc.data())
                if(post_array.length == 0){
                    const like_id = FirebaseService.CreateUID(15)
                    transaction.set(doc(collection(this.db, "Like"),like_id),{
                        postId:post_id,
                        id:like_id,
                        usuario_id:this.get_uid()
                    })
                    
                    transaction.update(
                        doc(this.db,"Post", post_id),
                        {
                            likes: previous_likes + 1,
                            first_likes:first_likes
                        }
                    )
                    liked = true
                }else{

                    transaction.delete(doc(collection(this.db, "Like"),post_array[0].id))
                    
                    transaction.update(
                        doc(this.db,"Post", post_id),
                        {
                            likes: previous_likes - 1,
                            first_likes:first_likes
                        }
                    )
                }
            
            })

            return liked;
        }catch(err){
            console.error(err)
            throw new Error("Error al realizar o quitar un like")

        }
    }


    public async get_likes(current_posts:string[]):Promise<Like[]>{
        const likes = await getDocs(query(collection(this.db, "Like"),where("postId", "in", current_posts)));
        const likes_array = likes.docs.map(doc => doc.data())
        return likes_array as Like[]
    }

    public async get_comments(post_id:string):Promise<Comment[]>{
        const comentarios = await getDocs(collection(this.db,"Post",post_id,"comentarios"));
        const docs = comentarios.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return docs as Comment[];
    }

    public async upload_image(carpeta:string,filename:string,file:File):Promise<string|Error>{
        try{
            const storage_ref = ref(this.storage,carpeta+"/"+filename)
            const upload = await uploadBytes(storage_ref,file)
            return await getDownloadURL(upload.ref)
        }catch(error){
            throw new Error("Server error when uploading image")
        }
    }

    public async create_profile(username:string,image:string,bio:string){
        try{
            await setDoc(doc(this.db,"Perfil", this.get_uid()),{
                bio:bio,
                imagen:image,
                username:username,
                amigos:0
            })
        }catch(error){
            console.error(error)
            throw new Error("Error al crear perfil")
        }
    }


    public async get_post():Promise<[Post]>{
        const query_snapshot = await getDocs(collection(this.db, "Post"));
        const docs = query_snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return docs as [Post];
    }

    public async get_profile():Promise<Profile|undefined>{
        if(this.user){
            const doc_ref = doc(this.db,  "Perfil", this.user.uid);
            const doc_data = await getDoc(doc_ref);
            if(doc_data.exists()){
                const data = doc_data.data()  as Profile;
                return data

            }
        }else{
            throw new Error("Este perfil no existe")
        }

    }

    public async get_profile_by_uid(uid:string){
        const doc_ref = doc(this.db,  "Perfil", uid);
        const doc_data = await getDoc(doc_ref);
        if(doc_data.exists()){
            const data = doc_data.data()  as Profile;
            return data

        }else{
            throw new Error("Este perfil no existe")
        }
    }

    public async get_user_posts(user_id:string):Promise<[Post]>{
        const query_snapshot = await getDocs(query(collection(this.db,"Post"), where("usuario_id","==",user_id)));
        const docs = query_snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
        return docs as [Post];

    }

    public async add_friend(friend_uid:string,current_friends:number,creator_username = ""){

        try{
            await runTransaction(this.db, async (transaction:Transaction)=>{
                const friends =  [friend_uid,this.get_uid()]
                const amigos = await getDocs(query(collection(this.db,'Amigo'),where('usuario_1_id', 'in',friends),where("usuario_2_id", "in", friends)));
                const amigos_array = amigos.docs.map(doc => doc.data())
                if(amigos_array.length > 0){
                    const request_ref = doc(this.db,"Amigo",amigos_array[0].request_id);
                    if(amigos_array[0].usuario_1_id == this.get_uid()){
                        console.log("Mismo usuario")
                        transaction.delete(request_ref)
                    }else{
                        console.log("Diferente usuario")
                        transaction.update(request_ref,{
                            aceptado:true
                        })
                        const friend_profile_ref = doc(this.db,"Perfil",friend_uid)
                        const friend_profile_data = await transaction.get(friend_profile_ref)
                        const friend_profile = friend_profile_data.data() as Profile
                        console.log(friend_profile)
                        transaction.update(friend_profile_ref,{
                            amigos:friend_profile.amigos+1//here i want to add 1 to the previous ammount of fiends, friends is an int
                        })

                        transaction.update(doc(this.db,"Perfil",this.get_uid()),{
                            amigos:current_friends+1//here i want to add 1 to the previous
                        })
                    }
                }else{
                    const id = FirebaseService.CreateUID(15)
                    transaction.set(doc(this.db,"Amigo",id),{
                        request_id: id,
                        usuario_1_id:this.get_uid(),
                        usuario_2_id:friend_uid,
                        usuario_1_username:creator_username,
                        aceptado:false
                    })
                }
            })

    
        }catch(error){
            console.error(error);
            throw new Error("Algo salio mal en tu peticion para agregar a un amigo")
        }
    }

    public async get_friend_requests():Promise<Friend_Request[]|void>{
        try{
            const friend_requests = await getDocs(query(collection(this.db,'Amigo'),where('usuario_2_id', "==",this.get_uid())));
            const friend_requests_array = friend_requests.docs.map(doc => doc.data())
            return friend_requests_array as Friend_Request[]
        
        }catch(error){
            console.error(error);
            throw new Error("Algo salio mal al conseguir tus solicitudes de amistad")
        }
    }

}