import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../firebaseConfig"
import { createContext, useContext, useEffect, useState } from "react"
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const fetchUserData = onAuthStateChanged(auth, (user) => {
            if(user) {
                setIsAuthenticated(true);
                setUser(user);
            }else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return fetchUserData;
    }, [])
    
    const register = async (email, password, name) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('user', response?.user);

            await setDoc(doc(db, "users", response?.user?.uid), {
                name,
                userId: response?.user?.uid
            });
            return {success: true, data: response?.user};
        } catch (error) {
            let msg = error.message;
            if(msg.includes('(auth/invalid-email)')) msg = 'Invalid email'
            if(msg.includes('(auth/email-already-in-use)')) msg = 'This email is alreay in use'
            return {success: false, msg};
        }
    }

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return{success: true};

        } catch (error) {
            let msg = error.message;
            if(msg.includes('(auth/invalid-email)')) msg = 'Invalid email'
            if(msg.includes('(auth/invalid-credential)')) msg = 'Wrong credintial'
            return {success: false, msg};
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, register, login}}>
            {children}
        </AuthContext.Provider>
    )
}

export const  useAuth = () => {
    const value = useContext(AuthContext);

    if(!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
}