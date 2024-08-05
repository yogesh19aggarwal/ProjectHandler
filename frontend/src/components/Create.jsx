import {React, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { Box, Button } from '@mui/material'
import { Typography } from '@material-ui/core'
import MyDatePicker from './forms/MyDatePicker'
import MyMultiLineField from './forms/MyMultiLineField'
import MyTextField from './forms/MyTextField'
import MySelectField from './forms/MySelectField'
import { useForm } from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


const Create = () => {

  const [projectmanager, setProjectManager] = useState([])
  const [loading, setLoading] = useState(true)

  const hardcoded_options = [
    {id: '', name: 'None'},
    {id: 'Open', name: 'Open'},
    {id: 'In Progress', name: 'In Progress'},
    {id: 'Completed', name: 'Completed'},
  ]

  const getData=()=>{
    AxiosInstance.get(`projectmanager/`).then((res)=>{
      setProjectManager(res.data)
      console.log(res.data)
      setLoading(false)
    })
  }

  useEffect(()=>{
    getData()
  },[])

  const navigate = useNavigate()

  const defaultValues = {
    name: '',
    comments: '',
    status:'',
  }

  const schema = yup
  .object({
    name: yup.string().required('Name is required '),
    status: yup.string().required('Status is required'),
    comments: yup.string(),
    start_date: yup.date().required('Start date is required'),
    end_date: yup.date().required('End date is required').min(yup.ref('start_date'),'The end date can not be before than start date'),
  })

  const {handleSubmit, control} = useForm({defaultValues: defaultValues, resolver:yupResolver(schema)})

  const submission = (data) => {

    const startDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
    const endDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")

    AxiosInstance.post(`project/`,{
      name: data.name,
      projectmanager: data.projectmanager,
      start_date: startDate,
      end_date: endDate,
      comments: data.comments,
      status: data.status,
    })
 
    // console.log( data.name, startDate, endDate,  data.comments, data.status)

    .then((res)=>{
      navigate(`/`)
    })
  }

  return (
    <>
    {loading ? <p> Loading data.. </p>:
    <form onSubmit={handleSubmit(submission)}>
      <Box sx={{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px', color:'#fff', padding:2}}>

        <Typography sx={{marginLeft:'20px'}}>
          Create Records
        </Typography>

      </Box>

      <Box sx={{display:'flex', width:'100%', boxShadow:3, padding: 4, flexDirection:'column'}}>

        <Box sx={{display:'flex', justifyContent:'space-around', marginBottom:'40px'}}>

          <MyTextField
            label="Name"
            name="name"
            control={control}
            placeholder="Provide a project name"
            width = {'30%'}
          />

          <MyDatePicker
            label = "Start date"
            name = "start_date"
            control = {control}
            width = {'30%'}
          />

          <MyDatePicker
            label = "End date"
            name = "end_date"
            control = {control}
            width = {'30%'}
          />

        </Box>

        <Box sx={{display:'flex', justifyContent:'space-around'}}>

          <MyMultiLineField
            label="Comments"
            name="comments"
            control={control}
            placeholder="Provide a project name"
            width = {'30%'}
          />

          <MySelectField
            label = "Status"
            name = "status"
            control = {control}
            width = {'30%'}
            options = {hardcoded_options}
          />

          <MySelectField
            label = "Project Manager"
            name = "projectmanager"
            control = {control}
            width = {'30%'}
            options = {projectmanager}
          />

        </Box>

        <Box sx={{display:'flex', justifyContent:'space-around', marginTop: '30px'}}>
          
          <Button variant='contained' type='submit' sx={{width: '30%'}}> 
            Submit
          </Button>

        </Box>

      </Box>

    </form>
    }
    </>
  )
}

export default Create