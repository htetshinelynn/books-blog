<template>
  <form @submit.prevent="addPost">
    <label>Title</label>
    <input type="text" required v-model="title">

    <label>Image</label>
    <input type="file" required @change="onUploadImage">
    <img :src="url" alt="" class="">

    <label>Body</label>
    <textarea required v-model="body"></textarea>

    <label>Tags(hit enter to add a tag)</label>
    <input type="text" v-model="tag"  @keydown.enter.prevent="handleKeydown">
    <div v-for="tag in tags" :key="tag" class="pill">
      {{tag}}
    </div>
    <button>add post</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import {useRouter} from 'vue-router'
import {db,fb} from "../firebase/config"
import firebase from "firebase/app";
import "firebase/firestore"

export default {
  setup(){
    let router=useRouter(); //this.$router
    let fname=ref("");
    let url=ref('');

    let onUploadImage=(e)=>{
      let file=e.target.files[0];
      
      let fileName=file.name;
      
      var storageRef = fb.storage().ref('images/'+file.name);

      let uploadTask = storageRef.put(file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          console.log(error);
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL()
          .then((downloadURL) => {
            url.value=downloadURL;
            console.log('File available at', downloadURL);
          });
        }
      );

      fname.value=fileName;
      // console.log(fileName);
      console.log(fname.value);
    }
    
    let title=ref("");//title
    let body=ref("");//body
    let imgname=ref("");
    let tag=ref("");//html
    let tags=ref([]);   


    let handleKeydown=()=>{
      if(!tags.value.includes(tag.value)){
        tags.value.push(tag.value)
      }
      tag.value=""
    }
    let addPost=async()=>{
      let newPost= {
          title:title.value,//""
          imgname:url.value,
          body:body.value,//""
          tags:tags.value//[]
        }

        console.log(newPost);

        try{
          let res=await db.collection("posts").add(newPost)
          
        }catch(err){

          console.log(err);
        }

        // redirect user to home page
        router.push("/");
    }
    return {title,body,tag,handleKeydown,tags,addPost,onUploadImage,url}
  }
}
</script>

<style>
  form {
    max-width: 480px;
    margin: 0 auto;
    text-align: left;
  }
  input, textarea {
    display: block;
    margin: 10px 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #eee;
  }
  textarea {
    height: 160px;
  }
  label {
    display: inline-block;
    margin-top: 30px;
    position: relative;
    font-size: 20px;
    color: white;
    margin-bottom: 10px;
  }
  label::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #ff8800;
    position: absolute;
    z-index: -1;
    padding-right: 40px;
    left: -30px;
    transform: rotateZ(-1.5deg);
  }
  button {
    display: block;
    margin-top: 30px;
    background: #ff8800;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 18px
  }
  .pill {
    display: inline-block;
    margin: 10px 10px 0 0;
    color: #444;
    background: #ddd;
    padding: 8px;
    border-radius: 20px;
    font-size: 14px;
  }
</style>