import {post} from "@/configs/axios.config";

/**
 *
 * @param params
 * {
 *   "code":"tmp = input()\r\nstr = tmp.split(' ')\r\na = int(str[0])\r\nb = int(str[1])\r\nprint(a+b)",
 *   "input_case":["123 123"],
 *   "output_case":["246"],
 *   "time":1000,
 *   "memory":100000,
 *   "language":"python",
 *   "result_type":"str"
 * }
 * @returns {Promise<unknown>}
 */
export const codeTest=(params)=>{
    return post("/oj_run_v2",params)
}

export const codeTest_v1=(params)=>{
    return post("/oj_run_v1",params)
}
