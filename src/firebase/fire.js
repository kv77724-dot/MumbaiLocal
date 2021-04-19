import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email,password) => {
    console.log("In fire login "+email+" "+password)
    await auth().signInWithEmailAndPassword(email,password)
    .then((value)=>{console.log(value);storeData(value?.user?.uid)})
}

const storeData = async value => {
    try {
      await AsyncStorage.setItem('@token', value);
      console.log('Token to async', value);
      navigation.navigate('HomePage');
    } catch (e) {
      // saving error
    }
  };

export const signup = async (email,password,firstName,lastName, mobNumber, idCard, idCardNum) =>{
    await auth().createUserWithEmailAndPassword(email,password)
    .then((userInfo) =>{
        console.log("Signup done with UID: "+userInfo.user.uid)
        firestore().collection('users').doc(userInfo.user.uid).set({
            firstname: firstName,
            lastname: lastName,
            mobilenumber: mobNumber,
            idcard: idCard,
            idcardnumber: idCardNum
        })
        .catch((error)=>console.log(error))

        
        
    })
}