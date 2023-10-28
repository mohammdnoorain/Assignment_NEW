import { useState} from "react";


 import {Modal,Button} from 'react-bootstrap';
 import postService from "../services/postService";



 function UpdateModalComponent(props){
    const [isShow,invokeModal] = useState(false);

    const initModal =()=>{
        return invokeModal(!isShow);
    }
/// form updation data

const [name,setName]= useState(props.name);
const [email,setEmail]= useState(props.email);
const [id,setId]= useState(props.id);
const [selectedFile,setSelectedFile]= useState('');

 const handleSubmit = async(event)=>{
    event.preventDefault();

    const formData = new FormData();
    formData.append('id',id);
    formData.append('name',name);
    formData.append('email',email);

    if(selectedFile !='' && selectedFile.length!=0){
        
        formData.append('image',selectedFile);
    }
   const response = await postService.update(formData);
   if(response.data.success === true){
    alert(response.data.msg);
   }
   else{
    alert(response.data.msg);
   }
   initModal();
 }



    return(

        <>
        <Button variant="success" onClick={initModal}>
            Edit
        </Button>
        <Modal show={isShow}>

            <Modal.Header closeButton onClick={initModal}>
                <Modal.Title>Updatte Post</Modal.Title>
            </Modal.Header>

            <form  onSubmit={handleSubmit}>



            <Modal.Body>
             <input type="text"
             name='name'
             placeholder="Enter Name"
             value={name} 
             onChange={event =>setName(event.target.value)}
             required/>
             <br></br>
             <br></br>
             <input type="text"
             name='email'
             placeholder="Enter Email"
             value={email} 
             onChange={event =>setEmail(event.target.value)}
             required/>
             <br></br>
             <br></br>
             <input type="file"
             name='file'
             onChange={event =>setSelectedFile(event.target.files[0])}
           />
             <br></br>
             <br></br>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="denger" onClick={initModal}>
                    Close
                </Button>
                <Button type="submit" variant="dark">
                    Update
                </Button>
            </Modal.Footer>
            </form>
        </Modal>
        </>
    )
 }
 export default UpdateModalComponent;