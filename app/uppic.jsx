import { Button , IconButton } from "react-native-paper";
import { StyleSheet, Image, TouchableOpacity, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Updatepic() {
    const router = useRouter();
    const [image, setImage] = useState(''); 
    const { user } = useAuth();
    const [errMsg, setErrMsg] = useState('');

    async function fetchprofile() {
        let { data } = await supabase.from('profile').select('*');
        setImage(data[0].image_url);
    }

    useEffect(() => {fetchprofile()},[])

    const handleAddImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images});
        if (!result.cancled) {
            setImage(result.assets[0].uri);
        }
    }

    const handleSubmit = async () => {

        let uploadedImage = image;

        if (image != null) {
            const {data, error } = await supabase.storage.from('images').upload(`${new Date().getTime()}`, { uri: image, type: 'jpg', name: 'name.jpg' });

            if (error != null) {
                setErrMsg(error.message);
                return;
            }
            const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(data.path);
            uploadedImage = publicUrl;
        }

        const { error } = await supabase.from('profile').update({image_url: uploadedImage }).eq('id', user.id)

        if (error != null) {
            setErrMsg(error.message);
            return;
        }

        setImage(null);
        router.replace('/profile')

    }
    

    return (
    <SafeAreaView style= {{backgroundColor: "#FFCECE", flex: 1}}>
        <View style = {{backgroundColor:'#FFCECE'}}>
            <IconButton style = {{backgroundColor: '#FFCECE'}} icon = 'arrow-left' onPress={() => router.back()}/>
        </View>

        <View>
            <TouchableOpacity onPress={() => handleAddImage()}>
                <Image source = {{uri:image}} style = {styles.pic}/>
            </TouchableOpacity>
        </View>
        <View>
            <Button onPress={() => handleSubmit()}>
                <Text style= {styles.text}>Update Profile Picture</Text></Button>
            {errMsg !== "" && <Text>{errMsg}</Text>}
        </View>
    </SafeAreaView>
    )
}
//{width: '100%', height: undefined, aspectRatio: 1}

const styles = StyleSheet.create( {

    pic: {
        height: undefined,
        width: "80%",
        aspectRatio: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        margin: 2,
        marginRight: 10,
        marginBottom: 12,
        alignSelf: "center"
    },

    text: {
        fontSize: 15,
        color: "#5A1B1B",
        alignSelf: "center",
    }
})