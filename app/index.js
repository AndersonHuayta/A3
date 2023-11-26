import  express  from "express";


//FIX PARA __DIRNAME POR EL TYPE JSON
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authenticacion } from "./controladores/authenticacion.js";
import {methods as autoriza} from "./middlewares/autoriza.js";

//SERVER
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("server funcionando en puerto", app.get("port"));


//CONFIG
app.use(express.static(__dirname + "/public"));
app.use(express.json());



//RUTAS
app.get("/", autoriza.soloPublico, (req, res) => res.sendFile(__dirname + "/paginas/login.html"));
app.get("/register",autoriza.soloPublico, (req, res) => res.sendFile(__dirname + "/paginas/register.html"));
app.get("/admin", autoriza.soloAdmin, (req, res) => res.sendFile(__dirname + "/paginas/admin/admin.html"));
app.post("/api/login", authenticacion.login);
app.post("/api/register", authenticacion.register);