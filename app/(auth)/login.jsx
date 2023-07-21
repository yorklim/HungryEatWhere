import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Link } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const handleSubmit = async () => {
        setErrMsg('');
        if (email == '') {
            setErrMsg("email cannot be empty")
            return;
        }
        if (password == '') {
            setErrMsg("password cannot be empty")
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) {
            setErrMsg(error.message);
            return;
        }
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Indecisive Foodie</Text>
            </View>
            <View style={styles.subContainer}>
                <View style= {{margin: 5}}>
                    <Text style={styles.inputText}>Email</Text>
                </View>
                <TextInput
                    placeholder="Email"
                    autoCapitalize='none'
                    textContentType='emailAddress'
                    value={email}
                    onChangeText={setEmail}
                    style={styles.inputContainer} />
            </View>
            <View style={styles.subContainer}>
            <View style= {{margin: 5}}>
                <Text style={styles.inputText}>Password</Text>
            </View>
            <TextInput
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize='none'
                textContentType='password'
                value={password}
                onChangeText={setPassword}
                style={styles.inputContainer} />
            </View>
            <View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        onPress={handleSubmit}
                        testID="loginButton" >
                        <Text style= {styles.textButton}>Login</Text>
                    </TouchableOpacity>
                    <Link href="/register">
                        <TouchableOpacity>
                        <Text style= {styles.textButton}>Go to register</Text>
                        </TouchableOpacity>
                    </Link>
                    
                </View>
                <View style={styles.errorContainer}>
                    {errMsg !== "" && <Text style={styles.errorMsg}>{errMsg}</Text>}
                    {loading && <ActivityIndicator />}
                </View>
            </View>
        </View>
    )
}

// need to add an overall <view> to add padding to everything
// so its not all stuck to the side
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FB9999"
    },
    subContainer: {
        padding: 10,
    },
    inputText: {
        color: "white",
        marginHorizontal: 15,
        fontSize: 11
    },
    inputContainer: {
        borderRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderWidth: 3,
        borderColor: "#FFDEAC",
        backgroundColor: "#FFEDD2",
    },
    textButton: {
        fontWeight: "bold",
        color: "white"
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: "space-around",
        margin: 5,
        marginTop: 20,
    },
    errorMsg: {
        fontWeight: "bold",
        color: "red",
        alignSelf: "center"
    },
    errorContainer: {
        width: "100%",
        padding: 20,
    },
    headerContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 40,
        color: 'white',
    }
})