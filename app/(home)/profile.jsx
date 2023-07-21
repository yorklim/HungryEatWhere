import { supabase } from '../../lib/supabase';
import { Button , Text} from 'react-native-paper';
import { StyleSheet , Image , ScrollView , View, RefreshControl, TouchableOpacity} from 'react-native';
import { useState , useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { useAuth } from "../../contexts/auth";
// import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    // const [name, setName] = useState('Username');
    const [image, setImage] = useState(null);
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
        setImage(data[0].image_url);
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
            <View style = {styles.topbar}>
                <Text style = {styles.headerText}>Profile</Text>
            </View>


            <View style= {styles.subcontainer}>
                <Image style = {styles.pic}
                    source = {{uri:image}}/>
                <Text style= {styles.profile}>{profile.name}</Text>
                <View style= {styles.content}>
                    <TouchableOpacity style = {styles.button} onPress={() => router.push('/uppic')}>
                            <Text style = {styles.buttonText}>Edit Profile Picture</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.button} onPress={() => router.push('/upname')}>
                            <Text style = {styles.buttonText}>Edit Nickname</Text>
                    </TouchableOpacity >

                    <View>
                        <TouchableOpacity style = {styles.button} onPress={() => router.push('/setup')}>
                            <Text style = {styles.buttonText}>Calibrate Preference</Text>
                        </TouchableOpacity>
                    </View>
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
                <Button onPress={() => supabase.auth.signOut()}><Text style= {styles.logout}>Logout</Text></Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#FFEDD2",
    },

    headerText: {
        flex : 1,
        marginLeft: 30, 
        fontSize: 30,
        fontWeight: "bold",
        color: "#FB9999",
    },

    topbar: {
        backgroundColor: '#FFEDD2',
        flexDirection: 'row',
        alignItems:'center',
        height: 70
    },

    pic: {
        height: "30%",
        width: undefined,
        aspectRatio: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        margin: 2,
        marginRight: 10,
        marginBottom: 12,
        alignSelf: "center"
    },

    button : {
        height: 100,
        width: '90%',
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: '#FFCECE',
        justifyContent: 'center',
        alignItems:'center',
        underlayColor : '#FFCECE',
        marginLeft: '5%',
    },

    buttonText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#643939",
    },
    subcontainer: {
        height: "100%",
        backgroundColor: "#FB9999",
        paddingTop: 20
    },

    logout: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    profile: {
        fontSize: 15,
        alignSelf: "center",
        paddingBottom: 5,
        fontWeight:"bold",
    },
    content: {
        height: "45%",
        justifyContent: "space-around",
    },
});
