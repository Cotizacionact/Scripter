import {getApps, initializeApp, type FirebaseApp} from "firebase/app"
import {Firestore, getFirestore} from "firebase/firestore"
import {firebaseConfig} from "../../env"
import {type Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User} from "firebase/auth"
import { redirect } from "@sveltejs/kit"

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
    public static getInstance(): FirebaseService {
        if (!FirebaseService.instance) {
            FirebaseService.instance = new FirebaseService();

        }
        return FirebaseService.instance;
    }

    public getUser(){
        return this.user
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
}