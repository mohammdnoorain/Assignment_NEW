const prisma = require('../prisma/index')


const getPosts =async(req,res)=>{
    try{
        const posts= await prisma.post.findMany();
      
        res.status(200).send({success:true,msg:'post data',data:posts});
             
    }catch (error){
        res.status(400).send({success:false,msg:error.message});
    }
}

const createPost = async(req,res)=>{

    try{
     

        const registeradmin =await prisma.post.create({
            data:{
                name:req.body.name,
                email:req.body.email,
                image:req.file.filename
                     
        
        }
        
        
        });
    console.log(registeradmin);
     
       res.status(200).send({success:true,msg:'post data',data:registeradmin});


    }catch (error){
   
        res.status(400).send({success:false,msg:error.message});
    }
}



const updatePost= async(req,res)=>{
    try{
        console.log(req);
       if(req.file !== undefined){
        var id = req.body.id;
        var name= req.body.name;
        var email= req.body.email;
        var filename = req.file.filename;

        const output = await prisma.post.update({
            
            where:{_id:id},
            data:{
            name:name,
            email:email,
            image:filename
            }
        });

        res.status(200).send({success:true,msg:'post updated successfully'});
       }
       else{
        var id = req.body.id;
        var name= req.body.name;
        var email= req.body.email;
       

        const output = await prisma.post.update({
            
            where:{id:id},
            data:{
            name:name,
            email:email,
            
    
            }
        });
       }
    }catch(error){
        res.status(400).send({success:false,msg:error.message});
    }

}




const deletePost= async(req,res)=>{
    try{


       const id = req.params.id;


        
        const result = await prisma.post.delete({
            where: {
              id: id 
            }
          });
      
       res.status(200).send({success:true,msg:'post deleted successfully'});
    }catch(error){
        res.status(400).send({success:false,msg:error.message});
    }

}


module.exports={
    createPost,
    getPosts,
    updatePost,
    deletePost
}