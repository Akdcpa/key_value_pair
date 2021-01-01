import React, { Component } from 'react'

import { 
    Button,
    TextField, 
    Typography
} from '@material-ui/core'; 

import axios from 'axios'

export default class FileChoose extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            path:""
        }
    }

    async getPath(e){
        await this.setState({
            path:e.target.value
        })

        console.log(this.state.path)
    }
    
    onSubmit(){  
        var path = JSON.stringify({
            path:this.state.path
        });
        console.log("Path",path)

        // fetch('http://localhost:5000/api/choose/file')
        // .then((res)=>{
        //     console.log("Res",res)
        //     return res.json
        // })
        // .then((res)=>{
        //     console.log("res",res)
        // }) 

        axios.get("http://localhost:5000/api/choose/file")
            .then((res)=>{
                console.log("Res",res)
            })

        
      
    }

    render() {
        return (
            <div style={styles.head} >
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}} >
                    <TextField variant="outlined" onChange={(e)=>this.getPath(e)} >Enter JSON File Path</TextField>
                    <Button variant="contained" color="primary"  style={{marginTop:30}} onClick={()=>this.onSubmit()} >Submit</Button>
                </div>
                <Typography>OR</Typography>
                <div>
                    <Button variant="outlined" color="primary" >Create Random JSON file</Button>
                </div>
            </div>
        )
    }
}


const styles = {
    head:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-evenly",
        height:window.innerHeight
    },

}