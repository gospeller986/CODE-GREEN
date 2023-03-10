import React from 'react'
import CodeBlock from '../components/CodeBlock'
import Base from './Base'




const Dashboard = () => {
  return (
    <div>
        <Base title='Dashboard' description='This is the desc Page' >

            <h1>DashBoard Page</h1>

            <CodeBlock/>
        
        </Base>
    </div>
  )
}

export default Dashboard