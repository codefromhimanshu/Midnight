import {useState,useCallback,useMemo} from 'react'
import firebaseHandle from '../../utils/firebaseHandle'
import Datastore from '../../utils/datastore'
function useProfile({navigation}){const [userData,setUserData]=useState(null)
const db=useMemo(async ()=>firebaseHandle.getDBInstance("users"),[])
const finder=Datastore.readItem("email")
db.where("email","==",finder).get().then(function(querySnapshot){
querySnapshot.forEach(function(doc){setUserData(doc.data())})}).catch(function(error){
console.log(error)})
const signOut=useCallback(async ()=>{await Datastore.deleteItem("email")
firebaseHandle.getInstance().auth().signOut()},[])
return {userData,signOut}}
export default useProfile