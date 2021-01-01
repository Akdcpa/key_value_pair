import React, { Component, useState } from 'react'

import {
    Button,
    TextField,
    Typography,
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableRow, 
} from '@material-ui/core'
 
import { 
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment'
import { DateTimePicker } from 'react-widgets'
import DeleteIcon from '@material-ui/icons/Delete'; 

var formatter = moment().format("YYYY-MM-DD:HH")

function Picker() {
    const [value, onChange] = useState(new Date());
   
    return (
      <div>
        <DateTimePicker
          onChange={onChange}
          value={value}
        />
      </div>
    );
  }

export default class Main extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             path:localStorage.getItem('path'),
             data:[],
             key:"",
             value:"",
             date:"",
             time:"",
             date_err:false,
             time_err:false,
             key_err:false,
             value_err:false, 
        }

        this.getData = this.getData.bind(this);
    }

    componentDidMount(){
        this.getData()
    }

    checkDate(e){
        this.setState({date:e.target.value}) 
    }

    checkTime(e){
        this.setState({time:e.target.value}) 
    }
    

    getData = () =>{
        fetch('http://localhost:5000/api/get',{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                path:this.state.path
            })
            })
            .then((res)=>res.json())
            .then((res)=>{
                
                var data = []
                for(var i in res)
                    data.push([i, res[i]]);
                this.setState({
                    data
                })
                console.log("Result" , this.state.data)
            }) 
    } 

    addData = () =>{

        const {
            key,
            value,
            date,
            time,
            path,
            key_err,
            value_err,
            date_err,
            time_err, 
        } = this.state; 

        if(key.length==0){
            this.setState({key_err:true})
        }
        else{
            this.setState({key_err:false})
            if(value.length==0){
                this.setState({value_err:true})
            }
            else{
                this.setState({value_err:false})
                if(date.length!=10 && date.length!=0){
                    this.setState({date_err:true})
                }
                else{
                    this.setState({date_err:false})
                    if(time.length!=5 && time.length!=0){
                        this.setState({time_err:true})
                    }
                    else{
                        this.setState({time_err:false})
                        var timestamp = 0;
                        if(date.length!=0 && time.length!=0){
                            let year = Number(date.slice(6,10))
                            let month = Number(date.slice(3,5))
                            let day = Number(date.slice(0,2))
                            let hour = Number(time.slice(0,2))
                            let min = Number(time.slice(3,5))
                            let doc = new Date(year,month,day,hour,min);
                            let cur = new Date().getTime();
                            timestamp = doc.getTime(); 
                            console.log("stamp:",year,month,day,hour,min,timestamp,cur)
                        }
                        
                        var data = JSON.stringify({
                            path:path,
                            key:key,
                            value:value,
                            timestamp:timestamp, 
                        })
                        fetch('http://localhost:5000/api/add',{
                            method:"POST",
                            headers:{
                                "Accept":"application/json",
                                "Content-Type":"application/json"
                            },
                            body: data
                            })
                            .then((res)=>res.json())
                            .then((res)=>{
                                console.log(res)
                                this.getData()
                                this.setState({
                                    key:"",
                                    value:"",
                                    date:"",
                                    time:""
                                })
                            })
                    }
                }
            }
        }
    }

    deleteData(key){
        let url = 'http://localhost:5000/api/delete/'
        fetch(url,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                key:key,
                path:this.state.path
                })
            })
            .then((res)=>{ 
                return res.json()
            })
            .then((res)=>{
                console.log("Del Res",res)
                this.getData()
            })

    }
    render() {
        
        return (
            <div style={{display:"flex",alignItems:"center",flexDirection:"column"}} > 
                <div style={{display:"flex",flexDirection:"row",alignItems:"center"}} >
                    <div>
                        <TextField value={this.state.key} error={this.state.key_err} helperText="format: String" style={{margin:10}} label="Key" variant="outlined" onChange={(e)=>this.setState({key:e.target.value})} />
                        <br/>
                        <TextField value={this.state.value} error={this.state.value_err} helperText="format: Any datatype"  style={{margin:10}} label="Value" variant="outlined" onChange={(e)=>this.setState({value:e.target.value})} />
                    </div>
                    <div > 
                        <TextField value={this.state.date} error={this.state.date_err} helperText="format: DD-MM-YYYY" style={{margin:10}} label="Date" variant="outlined" onChange={(e)=>this.checkDate(e)} />
                        <br/>
                        <TextField value={this.state.time} error={this.state.time_err} helperText="format: HH:MM"  style={{margin:10}} label="Time" variant="outlined" onChange={(e)=>this.checkTime(e)} />
                    </div>
                </div>
                <Button variant="contained" color="primary"  style={{marginTop:30}} onClick={this.addData} >Add</Button>
                <div>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Key</TableCell>
                            <TableCell align="right">Value</TableCell> 
                            <TableCell align="right">Action</TableCell> 
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.data.map((row,ind) => (
                            <TableRow key={ind} >
                                <TableCell component="th" scope="row">{row[0]}</TableCell>
                                <TableCell align="right">{row[1]['data']}</TableCell> 
                                <TableCell style={{cursor:"pointer"}} onClick={()=>this.deleteData(row[0])} ><DeleteIcon/></TableCell>
                        </TableRow>
                        ))}
                         
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }
}
