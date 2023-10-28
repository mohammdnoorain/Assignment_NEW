import React ,{useState} from "react";
import postService from "../services/postService";


function CreateComponent(){
 

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [image,setImage]=useState('');
    const [message,setMessage]=useState('');

    const handleSubmitthis = async(event)=>{
     event.preventDefault();
     const formData = new FormData();
     formData.append('name',name);
     formData.append('email',email);
     formData.append('image',image);
      const response  = await postService.create(formData);
      if(response.data.success == true){
        setMessage('post created successfully');

      }
      else{
        setMessage('post failed');
      }
      setTimeout(function(){
setMessage('');
      },2000);
      event.target.reset();
    }

    return(


        <div>
            <h2>create post</h2>
            <form onSubmit={handleSubmitthis}>
                <input type="text"
                name="name"
                placeholder="Enter name"
                onChange={event => setName(event.target.value)}
                required/>

                <br/><br/>
                <input type="text"
                name="email"
                placeholder="Enter email"
                onChange={event => setEmail(event.target.value)}
                required/>
                  <br/><br/>

                  <input type="file"
                name="image"
                onChange={event => setImage(event.target.files[0])}
                required/>
                 <br/><br/>
                 <button>Submit</button>



            </form>

            <p>{message}</p>
        </div>
    )
}


export default CreateComponent;