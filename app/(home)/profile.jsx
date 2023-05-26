import { supabase } from '../../lib/supabase';
import { Button , Text, TextInput, ActivityIndicator } from 'react-native-paper';
import { StyleSheet , Image , ScrollView , View, RefreshControl, TouchableOpacity} from 'react-native';
import { useState , useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { useAuth } from "../../contexts/auth";
// import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    // const [name, setName] = useState('Username');
    // const [image, setImage] = useState(null);
    // const [errMsg, setErrMsg] = useState('');
    // const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    // const { user } = useAuth();
    const router = useRouter();

    async function fetchprofile() {
        setRefreshing(true);
        let { data } = await supabase.from('profile').select('*');
        setRefreshing(false);
        setProfile(data[0]);
    }

    useEffect(() => {
            fetchprofile();
        },[]);

    useEffect(()=> {
        if (refreshing) {
            fetchprofile();
            setRefreshing(false);
        }
    },[refreshing])

    // const handleAddImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Imagges});
    //     if (!result.cancled) {
    //         setImage(result.assets[0].uri);
    //     }
    // }

    // const handleSubmit = async () => {
    //     setErrMsg('');
    //     if (name === '') {
    //         setErrMsg('name cannot be empty')
    //         return;
    //     }
        
    //     setLoading(true);
    //     let uploadedImage = profile.image_url;

    //     if (image != null) {
    //         const {data, error } = await supabase.storage.from('images').upload(`${new Date().getTime()}`, { uri: image, type: 'jpg', name: 'name.jpg' });

    //         if (error != null) {
    //             setErrMsg(error.message)
    //             setLoading(false)
    //             return;
    //         }
    //         const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(data.path);
    //         uploadedImage = publicUrl;
    //     }

    //     const { error } = await supabase.from('profile').update({ name: name, image_url: uploadedImage }).eq('id', user.id)

    //     if (error != null) {
    //         setLoading(false);
    //         setErrMsg(error.message);
    //         return;
    //     }

    //     setLoading(false);
    //     setName('Username');
    //     setImage(null);
    //     setRefreshing(true);

    // }

    return (
        <SafeAreaView style = {styles.container}>
            <ScrollView
            contentContainerStyle = {{gap:10}}
            refreshControl={
                <RefreshControl
                onRefresh={() => setRefreshing(true)}
                refreshing={refreshing}
                />
            }
            >
            <View style = {styles.profile}>
                <TouchableOpacity onPress={() => router.push('/uppic')}>
                    <Image
                        style = {styles.icon}
                        source = {{uri:profile.image_url}}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/upname')}>
                    <Text style = {styles.name}> {profile.name} </Text>
                </TouchableOpacity >
            </View>

            <View>
                <TouchableOpacity style = {styles.button} onPress={() => router.push('/setup')}>
                    <Text style = {styles.buttontext}>Calibrate Preference</Text>
                </TouchableOpacity>
            </View>

            {/* <View>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                <Text>New Username: </Text>
                <TextInput
                    autoCapitalize='none'
                    textContentType='username'
                    value={name}
                    onChangeText={setName}
                />
                {errMsg !== '' && <Text>{errMsg}</Text>}
                <Button onPress={handleAddImage}>Change Image</Button>
                <Button onPress={handleSubmit}>Submit</Button>
                {loading && <ActivityIndicator />}
            </View> */}

            <Button onPress={() => supabase.auth.signOut()}>Logout</Button>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        flexDirection: "column",
    },

    profile: {
        flexDirection: 'row',
        alignItems : 'center',
        backgroundColor : 'orange'
    },

    icon: {
        height: 80,
        width: 80,
        borderRadius: 40,
        margin: 10,
        borderColor: 'black',
        borderWidth : 1,
    },

    name: {
        fontSize: 20
    },

    button : {
        height: 100,
        width: '90%',
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems:'center',
        underlayColor : 'orange',
        marginLeft: '5%',
    },

    
});
