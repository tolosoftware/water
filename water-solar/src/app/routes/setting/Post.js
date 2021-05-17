import React,{useEffect,useState} from 'react';
import {Table} from 'reactstrap';
import Widget from "components/Widget/index";

import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import {useForm} from 'react-hook-form';
import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Swal from 'sweetalert2';
import IntlMessages from 'util/IntlMessages';
import Spinner from 'react-spinner-material';
import {NotificationContainer,NotificationManager} from 'react-notifications';
import './style.css'



const Post=() => {

const [post, setPost]=useState();
  useEffect(() => {
    getPost();
  },[])
  
  const getPost=async () => {
    axios.get('api/post')
      .then(res => {  
        setPost(res.data)
        }
    ).catch(err => {
         
          }
      )
  };

  const {register,handleSubmit}=useForm(); // initialize the hook
  const onSubmit=(data) => {
      axios.put('api/post/'+post.id, data)
        .then(res => {
          getPost();
              NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
              id="notification.titleHere" />);
            
              }
        ).catch(err => {
               NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
              id="notification.titleHere"/>);
            } 
        )
  };

    
  return (
    <>
       
      <Widget styleName={`tableheight`}>
        <div className="d-flex flex-row mb-2">
       
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Post Managment</h2>
            <strong>{post?.date}</strong>
           <div className="row">
              <TextField id="title" label="Post Title" variant="outlined"
                placeholder="Cable type"
                className="mt-3"
                defaultValue={post?.title}
                name="title"
                size="large"
                multiline={true}
                fullWidth={true}
                InputLabelProps={{
                    shrink: true,
                  }}
                inputRef={register} />

              <TextField id="discription" label="Post Discription" variant="outlined"
                placeholder="Cable type"
                className="mt-3"
                name="discription"
                size="large"
                defaultValue={post?.discription}
                InputLabelProps={{
                    shrink: true,
                  }}
                fullWidth={true}
                multiline={true}
                inputRef={register} />
               
            </div>
            <div className="row mt-4">
               <Button color="primary"   variant="contained" size="medium" type="submit">
                Update Post
                </Button>
            </div>
      </form>
              
        </div>
           
        
           
    </Widget>
     <NotificationContainer />
    </>
  );
};

export default Post;
