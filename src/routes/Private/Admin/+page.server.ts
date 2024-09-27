// src/routes/login/+page.server.js

import { redirect, RequestEvent } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request}:RequestEvent) => {
      // Handle form submission

      const  formData = await request.formData();
      const password = Number(formData.get("password") as string);
      if(password==123456){
        throw redirect(303, "/Private/Admin/Panel")
      }
    }
  };
  