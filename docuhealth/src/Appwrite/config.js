import conf from '../conf/conf.js'

import { Client, ID,Databases,Storage,Query } from 'appwrite'


export class Service{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket=new Storage(this.client)

    }

    async createPost({title,slug,description,imgurl,userid}){
        try{
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, 
                {
                 title,
                 description,
                 imgurl,
                 appointdate : new Date().toISOString(),
                 userid   
                }
             )
        }catch(error){
            console.log("Appwrite serive :: create post error",error);
        }
    }

    async updatePost(slug, {title, description,imgurl}){{
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    description,
                    imgurl
                }

            )
        }catch(error){
            console.log("Appwrite serive :: updatePost :: error" , error);
        }
    }}


    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }
        catch(error){
            console.log("Appwrite service :: deletePost:: error",error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug
            )
        }catch(error){
            console.log("Appwrite service :: getPost:: error",error);
        }
    }

    async getPosts(userid){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Query.equal("user_id",userid),
            
            )
        }catch(error){
            console.log("Appwrite service :: getPosts:: error",error);
            return false;

        }
    }


    //file upload

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,

            )
        }catch(error){
            console.log("Appwrite service :: uploadFile:: error",error);
            return false;
        }
    }

    async deleteFile(fileID){
        try{
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID,
                
            )
        }catch(error){
            console.log("Appwrite service :: deleteFile:: error",error);
            return false;
        }
    }

    getFilePreview(fileID){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileID
        )
    }
}

const service=new Service()
export default service
