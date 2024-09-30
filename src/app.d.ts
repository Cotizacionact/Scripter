// src/app.d.ts

import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Database } from './DatabaseDefinitions';
import { User } from 'firebase/auth';

declare global {
  namespace App {
    interface Locals {
    }
    interface ImportMetaEnv{
      XATA_BRANCH:string;
      XATA_API_KEY:string;
    }
    interface PageData {

    }
    // interface Error {}
    // interface Platform {}
  }
}

interface service {
  id:number,
  title:string,
  description:string,
  image:string,
  image_alt:string,
  url:string
}

interface Post {
  id: string;
  titulo:string;
  descripcion:string;
  usuario:string;
  usuario_id:string;
  likes:[string];
  comentarios:[Comment]
}

interface Comment {
  id: string;
  texto: string;
  usuario: string;
  usuario_id:string;
  likes:[string];
  comentarios:[Comment];
}

interface Profile {
  id: string;
  username: string;
  usuario_id:string;
  imagen:string;
  bio:string;
}
export {service, Post, Profile};
