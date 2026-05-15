import mongoose from "mongoose";


const userSchema = new mongoose.Schema({


    name:{

        type :"String",
        required:true


    },

    email:{

type:"String",
required:true,
unique:true

    },


    password:{

type:"String",
required:true


    },

        role: {
      type: String,

      enum: [
        "ADMIN",
        "SALES",
        "SANCTION",
        "DISBURSEMENT",
        "COLLECTION",
        "BORROWER"
      ],

      default: "BORROWER"
    }
  
},

{
    timestamps: true
  }


)



export default mongoose.model("User", userSchema);
