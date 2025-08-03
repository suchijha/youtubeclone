import mongoose from 'mongoose';

const channelSchema=new mongoose.Schema({
    channelImage:{
      type:String,
      required:true
    },
    channelName:{
        type:String,
        unique:true,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    channelBanner:{
        type:String,
        required:true
    },
    subscribers:{
        type:Number,
        default:0
    }
    

})

const Channel=mongoose.model('Channel',channelSchema)
export default Channel;