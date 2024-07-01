"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/gemini'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { db } from '../../../utils/db'
import { v4 as uuid4 } from 'uuid';
import moment from 'moment'
import { mockInterview } from '@/utils/schema'

  
type Props = {}

const NewInterview = (props: Props) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobDescription, setJobDescription] = useState('')
    const [yearsOfExperience, setYearsOfExperience] = useState(0)
    const [position, setPosition] = useState('')
    const [loading, setLoading] = useState(false)
    const [jsonResponse,setJsonResponse]=useState([]);
    const router=useRouter();
    const {user}=useUser();
  
    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      setLoading(true)
      e.preventDefault()
      console.log(position,jobDescription,yearsOfExperience);

        const InputPrompt="Job position: "+position+", Job Description: "+jobDescription+", Years of Experience : "+yearsOfExperience+" , Depends on Job Position, Job Description & Years of Experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" Interview question along with Answer in JSON format, Give us question and answer field on JSON"

        const result=await chatSession.sendMessage(InputPrompt);
        const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
        
        //console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);
        console.log("jsonResponse", jsonResponse);
        console.log("email",user?.primaryEmailAddress?.emailAddress)
        if(MockJsonResp)
        {
console.log("MockJsonResp", MockJsonResp);
        const resp=await db.insert(mockInterview)
        .values({
            mockId:uuid4().toString(),
            jsonMockResp:MockJsonResp,
            jobPosition:position,
            jobDesc:jobDescription,
            jobExperience:yearsOfExperience,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-yyyy')
        }).returning({mockId:mockInterview.mockId});

        console.log("Inserted ID:",resp)
        if(resp)
        {
            setOpenDialog(false);
            router.push('/interview/'+resp[0]?.mockId)
        }
    }
    else{
        console.log("ERROR");
    }
        setLoading(false);
    }
  
  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary hoover:scale-105 hoover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}>
            <h2 className='font-bold text-lg text-center'>+ Add New</h2>
        </div>
        {/* <Dialog> */}
        <Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent className='max-w-2xl'>
    <DialogHeader>
      <DialogTitle className='text-2xl'>Tell us more about the job you are interviewing for</DialogTitle>
      <DialogDescription>
        <form onSubmit={onSubmit}>
        <h3>Provide details about the job - the description, skills required, and years experience</h3>
        <div className='mt-7 my-2'>
          <label>Position</label>
          <Input placeholder='e.g. Software Engineer' required 
          onChange={(e) => setPosition(e.target.value)}/>
        </div>
        <div className='mt-7 my-2'>
          <label>Job Description</label>
          <Textarea placeholder='e.g. Software Engineer' required 
          onChange={(e) => setJobDescription(e.target.value)}/>
        </div>
        <div className='mt-7 my-2'>
          <label>Years of experience</label>
          <Input placeholder='5' type='number' max={50} min={0} required 
          onChange={(e) => setYearsOfExperience(Number(e.target.value))}/>
        </div>
        <div className='flex gap-5 justify-end'>
            <Button type='button' variant='ghost' onClick={()=>setOpenDialog(false)}>Cancel</Button>
            <Button type='submit' hidden={loading}>Start Interview</Button>
            {loading && <Button type='button' variant='ghost' disabled>Loading...</Button>}
        </div>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default NewInterview