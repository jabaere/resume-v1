import React from 'react'
import { motion } from 'framer-motion'
import { BsFillHeartFill } from 'react-icons/bs';
import { Item } from 'framer-motion/types/components/Reorder/Item';
import {skills,experience,projects,education,awards,interests} from '../api/data'
import DownloadButton from '../components/downloadButton'
//Wimport {CvItem} from '../components/CvItem'
export const Cv = () => { 
   //<CvItem data={experience} id='experience' color='red' title='exp' title2='erience'/>
   //<CvItem data={projects} id='projects' color='orange' title='my-' title2='projects'/>
   //<CvItem data={education} id='education' color='chartreuse' title='edu' title2='cation'/>
   //<CvItem data={awards} id='awards' color='darkviolet' title='awa' title2='rds'/>
   //<CvItem data={interests} id='interests' color='darkcyan' title='int' title2='erests'/>

  const container ={
    initial:{
      opacity:0
    },
    visible:{
      opacity:1,
      scale: 0.9,
      display: 'flex',
      transition:{
        delay:1.5,duration:1.5,ease: "easeOut"
      }
    },
    exit:{
      y:'-100vw',
      transition:{
        ease:'easeInOut',
        
      }
    }
  }
  return (
    <motion.div
     id='cv'
     variants={container}
     initial='initial'
     animate='visible'
     exit='exit'
    >
      
      <DownloadButton file_name='cv' buttonTitle='Download' _url='files/cv.pdf'/>
     <div style={{backgroundColor:"white",width: 650,display:'flex',flexDirection:'column',overflow:'auto'}}>
      <h1 
        style={{
          color:'white',
          letterSpacing:'5px',
          fontWeight:'lighter',
          fontSize:'52px',
          height: 70,
          backgroundColor:'#4D4D4D',
          marginTop: 0,
          marginBottom:0,
          textAlign:'center'
        }}>
          Jaba<span style={{fontWeight:'bold'}}>Kobriashvili</span>
      </h1>

      <div style={{display:'flex'}}>
      <div style={{display: 'flex',flexDirection:'column',flex:3}} id='left-container'>
          <div id='contact' style={{display: 'flex',textAlign:'right',flexDirection:'column'}}>
            <h4 style={{color:'#4D4D4D',marginBottom:0}}>contact</h4>
            <p style={{marginTop:0,fontSize: 12}}>
               45a kavkasioni st <br/>
               Telavi, Kakheti <br/>
               Georgia
            </p>
            <p style={{fontSize:12}}> +995 (551) 10 40 11</p>
            <p style={{fontSize:12}}>kobriashvili@gmail.com</p>
          </div>

          <div id='language' style={{display: 'flex',textAlign:'right',flexDirection:'column'}}>

          <h4 style={{color:'#4D4D4D',marginBottom:0}}>languages</h4>
          <p style={{marginTop:0,fontSize: 12}}>
           Georgian mother <br/>
           tongue <br/>
           English b1-b2 (...still <br/>
           learning) 
          </p>
          </div>
          <div id='programing' style={{display: 'flex',textAlign:'right',flexDirection:'column'}}>

            <h4 style={{color:'#4D4D4D',marginBottom:0}}>programming</h4>
             <p style={{marginTop:0,fontSize: 12}}>
             <BsFillHeartFill color='red'/>Javascript <br/>
              Python <br/>
              GraphQL <br/>
             </p>
          </div>

      </div>
      <div id='right-container' style={{display: 'flex',flex:9,marginLeft:60,flexDirection:'column'}}>
          <div id='skills'> 
             <h3 style={{color:'#4D4D4D',marginBottom:0}}><span style={{color: 'cyan'}}>ski</span>lls</h3>
             <p style={{fontSize:13, marginRight: '10px',color:'#4D4D4D'}}>
              {skills.map(skill => skill +', ')}
              </p>
         
          </div>

          <div id='experience'> 
             <h3 style={{color:'#4D4D4D',marginBottom:0}}><span style={{color: 'red'}}>exp</span>erience</h3>
           
            {experience.map(item => (
              <div style={{display: 'flex',alignItems:'baseline'}}>
                 <div><p style={{color:'#4D4D4D'}}>{item.year}</p></div>
                 <div style={{display: 'flex', flexDirection: 'column',justifyContent:'center'}}>
                    <div id='title' style={{display:'flex',justifyContent:'space-between',width:'400px',}}>
                       <div style={{flex:9, marginLeft:50,color:'#4D4D4D',fontWeight:'bold'}}>{item.company}</div>
                       <div style={{flex:1, marginLeft:50,color:'#4D4D4D',fontSize:10,padding:10}}>{item.city}</div>
                    </div>
                    <div style={{fontSize:12,marginLeft:50,color:'#4D4D4D'}}><i>{item.description}</i></div>
                    <div style={{fontSize:12,marginLeft:50,color:'#4D4D4D'}}>{item.job}</div>
                
                 </div>
              </div>
              ))}
         
          </div>
          <div id='projects'> 
             <h3 style={{color:'#4D4D4D',marginBottom:0}}><span style={{color: 'orange'}}>My-</span>projects</h3>
           
            {projects.map(project => (
              <div style={{display: 'flex',alignItems:'baseline'}}>
                 <div><p style={{color:'#4D4D4D'}}>{project.year}</p></div>
                 <div style={{display: 'flex', flexDirection: 'column',justifyContent:'center'}}>
                    <div id='title' style={{display:'flex',justifyContent:'space-between',width:'400px',}}>
                       <div style={{flex:9, marginLeft:50,color:'#4D4D4D',fontWeight:'bold',fontSize:14}}>{project.name}</div>
                       <div style={{flex:1, marginLeft:50,color:'#4D4D4D',fontSize:10}}><a target='_blank' style={{color:'#4D4D4D',fontSize:8,padding:10}} href={project.source}>source</a></div>
                    </div>
                    
                    <div style={{fontSize:10,marginLeft:50,color:'#4D4D4D'}}>Used Techniques: {project.techniques}</div>
                
                 </div>
              </div>
              ))}
         
          </div>
          <div id='education'> 
             <h3 style={{color:'#4D4D4D',marginBottom:0}}><span style={{color: 'chartreuse'}}>edu</span>cation</h3>
           
            {education.map(item => (
              <div style={{display: 'flex',alignItems:'baseline'}}>
                 <div><p style={{color:'#4D4D4D'}}>{item.year}</p></div>
                 <div style={{display: 'flex', flexDirection: 'column',justifyContent:'center'}}>
                    <div id='title' style={{display:'flex',justifyContent:'space-between',width:'400px',}}>
                       <div style={{flex:9, marginLeft:50,color:'#4D4D4D',fontWeight:'bold',fontSize:14}}>{item.name}</div>
                       <div style={{flex:1, marginLeft:50,color:'#4D4D4D',fontSize:10}}><span style={{padding:10}}>Course</span></div>
                    </div> 
                    
                    <div style={{fontSize:10,marginLeft:50,color:'#4D4D4D'}}> {item.title}</div>
                
                 </div>
              </div>
              ))}
         
          </div>
          <div id='awards'> 
             <h3 style={{color:'#4D4D4D',marginBottom:0}}><span style={{color: 'darkviolet'}}>awa</span>rds</h3>
           
            {awards.map(award => (
              <div style={{display: 'flex',alignItems:'baseline'}}>
                 <div><p style={{color:'#4D4D4D'}}>{award.year}</p></div>
                 <div style={{display: 'flex', flexDirection: 'column',justifyContent:'center'}}>
                    <div id='title' style={{display:'flex',justifyContent:'space-between',width:'400px',}}>
                       <div style={{flex:9, marginLeft:50,color:'#4D4D4D',fontWeight:'bold',fontSize:14}}>{award.title}</div>
                       <div style={{flex:1, marginLeft:50,color:'#4D4D4D',fontSize:10}}><span style={{padding:10}}>{award.provider}</span></div>
                    </div> 
             
                
                 </div>
              </div>
              ))}
         
          </div>
          <div id='interests' style={{marginBottom:20}}> 
             <h3 style={{color:'#4D4D4D',marginBottom:0}}><span style={{color: 'darkcyan'}}>int</span>erests</h3>
           
            {interests.map(item => (
              <div style={{display: 'flex',alignItems:'baseline'}}>
                
                 <div style={{display: 'flex', flexDirection: 'column',justifyContent:'center'}}>
                    <div id='title' style={{display:'flex',justifyContent:'space-between',width:'400px',fontSize:12,color:'#4D4D4D'}}>
  
                    professional: {item.professionalInterest}
                    </div> 
             
                
                 </div>
              </div>
              ))}
         
          </div>
         

      </div>
      </div>
     
      </div> 
      
    </motion.div>
  )
}
