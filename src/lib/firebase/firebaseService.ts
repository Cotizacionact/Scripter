import {getApps, initializeApp, type FirebaseApp} from "firebase/app"
import {collection, Firestore, getDocs, getFirestore, doc, getDoc, query, where, setDoc, addDoc, updateDoc, runTransaction} from "firebase/firestore"
import {firebaseConfig} from "../../env"
import {type Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User} from "firebase/auth"
import { redirect } from "@sveltejs/kit"
import type { Comment, Post, Profile } from "../../app"
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
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!#$%&/()=?¡¿+-^{}[]:;.,|';
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
            await runTransaction(db, async (transaction) => {
                // Add the comment
                const new_comment = await addDoc(comentariosRef, {
                    usuario: username,
                    usuario_id: this.get_uid(),
                    texto: text,
                    likes: 0,
                    comentarios: false
                });
                comment_id= new_comment.id
                // Update the comment count
                const postDoc = await transaction.get(postRef);
                if (!postDoc.exists()) {
                    throw "Post does not exist!";
                }
    
                const newCommentCount = comentarios_num + 1;
                transaction.update(postRef, { comentarios: newCommentCount });
            });
    
            return comment_id
        } catch (error) {
            console.error("Transaction failed: ", error);
            throw new Error("Error al crear comentario")
        }
    }

    public async handle_like(){
        //await runTransaction()
    }


    public async get_likes(current_posts:string[]){
        const likes = await getDocs(query(collection(this.db, "Like"),where("postId", "in", current_posts)));
        const likes_array = likes.docs.map(doc => doc.data())
        return likes_array
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
        console.log("Creating profile")
        try{
            await setDoc(doc(this.db,"Perfil", this.get_uid()),{
                bio:bio,
                imagen:image,
                username:username
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

    public async get_user_posts(user_id:string):Promise<[Post]>{
        const query_snapshot = await getDocs(query(collection(this.db,"Post"), where("usuario_id","==",user_id)));
        const docs = query_snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
        return docs as [Post];

    }
}