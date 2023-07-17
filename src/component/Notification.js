import { Notyf } from "notyf";
import 'notyf/notyf.min.css';

const notyf = new Notyf()
export const success = (message ) => notyf.success({message:message , className:"toastSucc"  , duration:2000  , position:{x:"right" , y:"top" }})
export const Error = (message ) => notyf.error({message:message ,className:"toastError", duration:2000 , position:{x:"right" , y:"top" }})

