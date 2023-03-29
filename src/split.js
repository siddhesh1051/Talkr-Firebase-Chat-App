import { LinearProgress } from '@mui/material';
import { fontWeight } from '@mui/system';
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useEffect } from 'react';
import './css/split.css'
import { db } from './firebase';

const Split = ({ splitTitle, splitAmount, uid, roomid, username }) => {

  const [splitUsersName, setSplitUsersName] = useState([])
  const [splitUsersPhoto, setSplitUsersPhoto] = useState([])
  const [splitUsers, setSplitUsers] = useState([])
  const [usersPaid, setUsersPaid] = useState(0)
  const [seeUsers, setseeUsers] = useState([])
  const [docId, setdocId] = useState()
  const [splitUsersCount, setSplitUsersCount] = useState(0)

  const qr = query(collection(db, roomid), orderBy('splitAmount', 'asc'));

  useEffect(() => {
    onSnapshot(qr, (snapshot) => {
      setSplitUsers(snapshot.docs.map((doc) => doc.data()))
    })

    
  }, [roomid])
  useEffect(() => {
    onSnapshot(qr, (snapshot) => {
      setdocId(snapshot.docs.map((doc) => ({docId: doc.id, ...doc.data()})))
    })

    
  }, [roomid,splitUsers])

  console.log(splitUsers)

  // useEffect(() => {

  //   setdocId(splitUsers.map((item) => {
  //     if (item.splitTitle === splitTitle && item.splitAmount === splitAmount) {
  //       return item.id
  //     }
  //     else {
  //       return null
  //     }

  //   }))
  //     setdocId(docId => docId.filter(item => item !== null))

  // }, [splitUsers])
  // console.log(docId[0]?.docId)


  useEffect(() => {
    setSplitUsersPhoto(splitUsers.map((item) => {
      if (item.splitTitle === splitTitle && item.splitAmount === splitAmount) {
        return item.splitUsersPhoto
      }
      else {
        return null
      }
    }))
  }, [splitUsers])

  

  useEffect(() => {
    setSplitUsersName(splitUsers.map((item) => {
      if (item.splitTitle === splitTitle && item.splitAmount === splitAmount) {
        return item.splitUsersName

      }
      else {
        return null
      }
    }))

    setSplitUsersName(splitUsersName => splitUsersName.filter(item => item !== null))
    

  }, [splitUsers])

  useEffect(() => {
    
      setUsersPaid(splitUsers.map((item) => {
      if (item.splitTitle === splitTitle && item.splitAmount === splitAmount) {
        return item.usersPaid

      }
      else {
        return null
      }
    }))

    setUsersPaid(splitUsersName => splitUsersName.filter(item => item !== null))
    

  }, [splitUsers])

  
  // const docref = doc(db, roomid, "3BlsWPkI2dphZFQ6oVdo")
  // useEffect(() => {
  //   console.log(usersPaid)
  //   updateDoc(docref, {
  //     usersPaid: usersPaid[0]
  //     });
  //   console.log(usersPaid)


    

  // }, [usersPaid])


  useEffect(() => {
    setSplitUsersCount(splitUsersPhoto.map((item) => {
      if (item !== null) {
        return item.length
      }
      else {
        return null
      }
    }))

    setSplitUsersCount(splitUsersCount => splitUsersCount.filter(item => item !== null))


  }, [splitUsersPhoto])




  // console.log(splitUsersPhoto)
  // console.log(splitUsersCount[0])




  
  

  useEffect(() => {
    setseeUsers(splitUsers.map((item) => {
      if (item.splitTitle === splitTitle && item.splitAmount === splitAmount) {
        return item.splitBy
      }
      else {
        return null
      }
    }))
  }, [splitUsers])

  // console.log(seeUsers)
      // console.log(splitUsers)
      // console.log(splitUsersName)


  // console.log(splitUsersCount)

  const handlePay = () => {
    let n = docId.length-1;
    docId[n-1].splitUsersName.map((item) => {
      console.log(item)
      if (item === username) {
        return item
      }
      else {
        return null
      }
    })


    console.log(docId[n-1].docId)
    const docref = doc(db, roomid, docId[n-1]?.docId)
    
    updateDoc(docref, {
      usersPaid: usersPaid[0] + 1
    });
    
    console.log(splitUsers)
    console.log(usersPaid)
    usersPaid[0] = usersPaid[0] + 1
    console.log(usersPaid)
  }
  

  return (
    <div style={{ backgroundColor: 'black' }}>
      <div className='splitBox'>
        <div className='splitTitle'>
          <p>{splitTitle}</p>
        </div>
        {/* <div className='splitDescription'>
                <p>Split Description</p>
        </div> */}
        <div className='splitAmount'>
          <h1 ><span style={{fontFamily:"sans-serif", fontWeight:'200'}}>₹ </span>{+ Math.round(splitAmount/splitUsersCount[0] * 100) / 100}</h1>
        </div>
        <div className='progressBarDiv'>
        <LinearProgress className='progressBar' variant="determinate" value={(usersPaid[0]* 100)/splitUsersCount} />
        <p className='countNum'>{usersPaid[0]}/{splitUsersCount} paid</p>
        </div>
        <div className='splitUsersImg'>
          <div className='splitAvatarDiv'> 
            {
              splitUsersPhoto.map((item) => {
                if (item !== null) {
                  return item.map((item) => {
                    return <img className='splitAvatar' src={item} alt='splitUsersPhoto' />
                  })
                }
                else {
                  return null
                }
              })

            }
          </div>
          
        </div>
        <div className='splitPayDiv'>
        {
          
          seeUsers.map((item) => {
            // console.log(splitUsersName[0])
            // console.log()
            if (item !== null && item !== username && splitUsersName[0].includes(username) )  return <button className='splitPay' onClick={handlePay}>Pay</button>
            else if(item !== null && !splitUsersName[0].includes(username)) return <button className='splitPayDisabled' disabled>Pay</button>
            else if(item !== null && item===username ) {
              return <button className='splitPayDisabled' disabled>Pay</button>}
              // 
            
          })
          // seeUsers.map((item) => {
          //   console.log(item)
          //   if (item !== null) {
          //     return item.map((item) => {
          //       return <button className='splitPay' onClick={handlePay}>Pay</button>
          //     })
          //   }
          //   else {
          //     return null
          //   }
          // })


          // ?<button className='splitPay' onClick={handlePay}>Pay</button>
          // :<button className='splitPayDisabled' disabled>Pay</button>
          

        }

        </div>
      </div>
    </div>
  )
}

export default Split
