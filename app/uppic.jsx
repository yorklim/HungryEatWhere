import { Button , IconButton } from "react-native-paper";
import { Image, TouchableOpacity, View, Text } from "react-native";
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
    <SafeAreaView>
        <View style = {{backgroundColor:'white'}}>
            <IconButton style = {{backgroundColor: 'white'}} icon = 'arrow-left' onPress={() => router.back()}/>
        </View>

        <View>
            <TouchableOpacity onPress={() => handleAddImage()}>
                <Image source = {{uri:image}} style = {{width: '100%', height: undefined, aspectRatio: 1}}/>
            </TouchableOpacity>
        </View>
        <View>
            <Button onPress={() => handleSubmit()}>Update Profile Picture</Button>
            {errMsg !== "" && <Text>{errMsg}</Text>}
        </View>
    </SafeAreaView>
    )
}