import {post} from "@/configs/axios.config";

export const toMessage=(params)=>{
    return post("/gpt",params)
}
