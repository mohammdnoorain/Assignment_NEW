import { useState,useEffect } from "react";
import postService from "../services/postService";
import UpdateModalComponent from"./UpdateModalComponent";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
function ShowComponent(){

    const [posts,setPosts] = useState({});

    const fetchPosts = async()=>{
        setPosts(await postService.getPosts());


    }

    
    useEffect(()=>{
        fetchPosts();
    },[posts]
    );
   const deletePost = async(id,e)=>{
  var response = await postService.deletePost(id);
  if(response.data.success == true){
    alert(response.data.msg);
    document.getElementById(id).parentElement.parentElement.remove();
  }
  else{
    alert(response.data.msg);
  }
   }
 return(
    <div className="App"> 
        <h1>Post</h1>

        {posts.data != undefined && posts.data.data.length >0 &&(

        <table style={{width:'100%'}} border='1'>
<thead>
<th>Name</th>
<th>Email</th>
<th>Image</th>
<th>Delete</th>
<th>Edit</th>

</thead>
<tbody>

    {posts.data.data.map(post=>(

        <tr>
            <td>{post.name}</td>
            <td>{post.email}</td>
            <td>
               <img src={'http://localhost:8000/api/adminimage/'+post.image}  style ={{width:'100px',height:'100px'}} />
                {post.image}</td>
                <td>
                    <button id={post.id} onClick={(e)=> deletePost(post.id,e)}>Delete</button>
                </td>
                <td>
                    <UpdateModalComponent id={post.id} name={post.name} email={post.email} />
                </td>
        </tr>
    )

    )}
</tbody>

        </table>



        )}
    </div>
 )


}

export default ShowComponent;