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
            email: email,
            firstname: firstName,
            lastname: lastName,
            mobilenumber: mobNumber,
            idcard: idCard,
            idcardnumber: idCardNum
        })
        .catch((error)=>console.log(error))   
    })
}

export const signout = async () => {
    await auth().signOut()
    .then(() => console.log('User signed out!'));
}

export const getuser = async (value) => {
   
    const userDoc = await firestore().collection("users").doc(value).get();
    
    console.log(userDoc._data)
    return userDoc._data;
}

export const saveticket = async(uid,source, destination, adult, child, classType, ticketType, ticketForm, fare, timestamp) => {
    await firestore().collection('ticket').add({
        uid: uid,
        source: source,
        destination: destination,
        adult: adult,
        child: child,
        classtype: classType,
        tickettype: ticketType,
        ticketform: ticketForm,
        fare: fare,
        timestamp: timestamp
    })
}

export const ticketlist = async(value)=> {
    let list;
    await firestore()
    .collection('Users')
    .where('uid', '==', value)
    .get()
    .then(querySnapshot => {
        list = querySnapshot;
    });

    // list.forEach(documentSnapshot => {
    //     console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    //   });

    return list;
}