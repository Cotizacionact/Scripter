import {getApps, initializeApp, type FirebaseApp} from "firebase/app"
import {collection, Firestore, getDocs, getFirestore, doc, getDoc, query, where, setDoc} from "firebase/firestore"
import {firebaseConfig} from "../../env"
import {type Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User} from "firebase/auth"
import { redirect } from "@sveltejs/kit"
import type { Post, Profile } from "../../app"

export default class FirebaseService{
    private static instance: FirebaseService;
    private app:FirebaseApp
    private db:Firestore
    private auth:Auth
    private user:User|undefined|null;

    constructor(){
       if(getApps().length!=0){
        this.app= getApps()[0]
       }else{
        this.app = initializeApp(firebaseConfig);
       }
        this.db = getFirestore(this.app);
        this.auth = getAuth(this.app);
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
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    }


    public async create_post(titulo:string, descripcion:string, username:string){
        await setDoc(doc(this.db,"Post", FirebaseService.CreateUID(15)),{
            comentarios:[],
            descripcion:descripcion,
            titulo:titulo,
            usuario:username,
            usuario_id:this.get_uid(),
            likes:[]
        })
        
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