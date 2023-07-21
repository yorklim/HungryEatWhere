import { Button, TextInput, IconButton } from "react-native-paper";
import { StyleSheet, View , Text} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth";
import { SafeAreaView } from "react-native-safe-area-context";


export default function UpdateName() {
    const router = useRouter();
    const [name, setName] = useState(''); 
    const { user } = useAuth();
    const [errMsg, setErrMsg] = useState('');

    async function fetchprofile() {
        let { data } = await supabase.from('profile').select('*');
        setName(data[0].name);
    }

    useEffect(() => {fetchprofile()},[])

    const handleSubmit = async () => {

        if (name == "") {
            setErrMsg("New name cannot be empty");
            return;
        }

        const { error } = await supabase.from('profile').update({name: name }).eq('id', user.id)

        if (error != null) {
            setErrMsg(error.message);
            return;
        }

        router.replace('/profile')

    }
    

    return (
    <SafeAreaView style={{backgroundColor: "#FFCECE", flex: 1}}>
        <View style = {{backgroundColor:'#FFCECE'}}>
            <IconButton style = {{backgroundColor: '#FFCECE'}} icon = 'arrow-left' onPress={() => router.back()}/>
        </View>
        <View style={styles.content}>
            <TextInput
                placeholder="New Name"
                autoCapitalize='none'
                textContentType='username'
                value={name}
                onChangeText={setName}
                style= {styles.input}
                underlineColor="transparent"
                activeUnderlineColor="transparent" 
            />
            <Button onPress={() => handleSubmit()}>
                <Text style= {styles.text}>Update Username</Text>
            </Button>
            {errMsg !== "" && <Text>{errMsg}</Text>}
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create( {

    
    text: {
        fontSize: 15,
        color: "#5A1B1B",
        alignSelf: "center",
    },

    input: {
        width: '90%',
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'center',
        alignItems:'center',
        underlayColor : '#FB9999',
        marginLeft: '5%',
        backgroundColor: "#FB9999",
        height: 100,
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    }
})