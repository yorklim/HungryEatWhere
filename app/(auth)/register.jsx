import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Text, TextInput, ActivityIndicator } from 'react-native-paper';
import { useRouter } from "expo-router";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        if (email == '') {
            setErrMsg("email cannot be empty")
            return;
        }
        if (password == '') {
            setErrMsg("password cannot be empty")
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        setLoading(false);
        if (error) {
            setErrMsg(error.message);
            return;
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Register</Text>
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
                style={styles.inputContainer}
                underlineColor="transparent"
                activeUnderlineColor="transparent" />
            </View>
            <View style={styles.subContainer}>
                <View style= {{margin: 5}}>
                    <Text style={styles.inputText}>Password</Text>
                </View>
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    autoCapitalize='none'
                    textContentType='password'
                    value={password}
                    onChangeText={setPassword} 
                    style={styles.inputContainer}
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"/>
            </View>
            <View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text style= {styles.textButton}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style= {styles.textButton}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.errorContainer}>
                {errMsg !== "" && <Text>{errMsg}</Text>}
                {loading && <ActivityIndicator />}
            </View>
        </View>
    );
}

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