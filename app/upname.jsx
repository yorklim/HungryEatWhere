import { Button, TextInput, IconButton } from "react-native-paper";
import { View , Text} from "react-native";
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
    <SafeAreaView>
        <View style = {{backgroundColor:'white'}}>
            <IconButton style = {{backgroundColor: 'white'}} icon = 'arrow-left' onPress={() => router.back()}/>
        </View>
        <View>
            <TextInput
                placeholder="New Name"
                autoCapitalize='none'
                textContentType='username'
                value={name}
                onChangeText={setName}
            />
        </View>
        <View>
            <Button onPress={() => handleSubmit()}>Update Username</Button>
            {errMsg !== "" && <Text>{errMsg}</Text>}
        </View>
    </SafeAreaView>
    )
}