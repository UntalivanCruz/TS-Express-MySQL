import {Router, Request, Response} from 'express'
import MySQL from '../mysql/mysql';

const router=Router()

router.get('/heroes',(req:Request,res:Response)=>{
   const query=`
   SELECT *
   FROM heroes
   `
   
   MySQL.ejecutarQuery(query,(err:any,resp:Object[])=>{
       if(err){
           res.status(400).json({
               ok:false,
               error:err
           })
       }else{
           res.json({
               ok:true,
               respuesta:resp
           })
       }
   })

})


router.get('/heroes/:id',(req:Request,res:Response)=>{
    const id=req.params.id
    const escapeId=MySQL.instance.conn.escape(id) 
    const query=`
   SELECT *
   FROM heroes
   WHERE idheroes=${escapeId}
   `
   
   MySQL.ejecutarQuery(query,(err:any,resp:Object[])=>{
       if(err){
           res.status(400).json({
               ok:false,
               error:err
           })
       }else{
           res.json({
               ok:true,
               respuesta:resp[0]
           })
       }
   })

})

export default router