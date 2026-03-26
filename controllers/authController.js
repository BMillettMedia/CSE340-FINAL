import bcrypt from "bcrypt"
import pool from "../database"

async function buildLogin(req,res){

res.render("auth/login",{title:"Login"})

}

async function buildRegister(req,res){

res.render("auth/register",{title:"Register"})

}

export default {
buildLogin,
buildRegister
}