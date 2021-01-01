import React, { Component } from 'react'

import { 
    Button,
    TextField, 
    Typography
} from '@material-ui/core'; 
 

export default class FileChoose extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            path:"",
            error:false,
            err_text:""
        }
    }

    async getPath(e){
        var path = e.target.value;
        await this.setState({
            path:path
        })
        if(path.slice(-5)=="json/" || path.slice(-4)=="json"){
            this.setState({
                error:false,
                err_text:""
            })
        }
        else{
            this.setState({
                error:true,
                err_text:"Invalid json"
            })
        }
        console.log(this.state.path.slice(-5))
    }
    
    onSubmit=()=>{  
        var path = JSON.stringify({
            path:this.state.path
        });
        console.log("Path",path)

        fetch('http://localhost:5000/api/checkPath',{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:path
        })
        .then((res)=>{   
            return res.json()
        })
        .then((res)=>{
            console.log("res",res)
            if(res.status!='success'){
                this.setState({
                    error:true,
                    err_text:"Invalid path"
                })
            }
            else{
                localStorage.setItem("path",this.state.path)
                this.props.history.push('/main')
            }
        }) 
 
    }

    chooseRandom = () =>{
        fetch('http://localhost:5000/api/choose/file')
        .then((res)=>{ 
            return res.json()
        })
        .then((res)=>{
            localStorage.setItem("path",res.path)
            console.log("res",res)
            this.props.history.push('/main')
        }) 
    }

    render() {
        return (
            <div style={styles.head} >
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}} >
                    <TextField helperText={this.state.err_text} error={this.state.error} label="Enter JSON File Path" variant="outlined" onChange={(e)=>this.getPath(e)} />
                    <Button variant="contained" color="primary"  style={{marginTop:30}} onClick={this.onSubmit} >Submit</Button>
                </div>
                <Typography>OR</Typography>
                <div>
                    <Button onClick={this.chooseRandom} variant="outlined" color="primary" >Create Random JSON file</Button>
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