import { useRouter } from "expo-router";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";


export default function Homepage() {
    const router = useRouter();
    const [daily, setDaily] = useState(
            {description: "NIL", 
             end: "NIL", 
             start: "NIL", 
             subject: "NIL", 
             url: "https://ntqfrkazxtichidbhfru.supabase.co/storage/v1/object/public/cover/No%20Special%20Food%20Today%20Try%20Normal%20Recommendation!.jpg"});

    async function fetchday() {
        let today = new Date();
        today = today.getDate() + "/" + (today.getMonth()+ 1) + "/" + today.getFullYear();
        let { data } = await supabase.from('foodday').select().eq('start', [today]);

        if (data[0] !== undefined) {
            setDaily(data[0]);
        }
    }

    const dailypress = () => {
        if (daily.subject !== "NIL") {
            router.push({
                pathname: '/recodaily',
                params : {subject: daily.description,
                          description: daily.subject}
            })
        }
    }

    useEffect(() => {
        fetchday();
    },[])

    return (
        <SafeAreaView style = {{flex : 1 ,gap : 10, backgroundColor: "#FFEDD2"}}>
            <View style = {styles.topbar}>
                <Text style = {styles.headerText}>Home</Text>
                <Image style = {styles.icon}
                    source = {require("../../assets/profilepic.png")}/>
            </View>
            <View style = {styles.content}>
                <TouchableOpacity onPress={() => dailypress()}>
                    <Image source = {{uri:daily.url}} style={{width:"95%", height:undefined, aspectRatio:16/10, borderRadius: 10}}/>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => router.replace('/recommend')}>
                    <Text style = {styles.buttonText}>Recommend Me</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => router.push('/nearby')}>
                    <Text style = {styles.buttonText}>Nearby Restuarant</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => router.push('/history')}>
                    <Text style = {styles.buttonText}>Recommendation History</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles =StyleSheet.create({
    icon: {
        height:'90%',
        width: undefined,
        aspectRatio: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        margin: 2,
        marginRight: 10,
    },

    topbar: {
        backgroundColor: '#FFEDD2',
        flexDirection: 'row',
        alignItems:'center',
        height: 60
    },

    content: {
        paddingTop: 10,
        height: "100%",
        flexDirection: 'column',
        alignItems: "center",
        gap: 10,
        backgroundColor: "#FB9999",
    },

    button : {
        height: 100,
        width: '95%',
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: '#FFCECE',
        justifyContent: 'center',
        alignItems:'center',
        underlayColor : '#FFCECE'
    },
    headerText: {
        flex : 1,
        marginLeft: 30, 
        fontSize: 30,
        fontWeight: "bold",
        color: "#FB9999",
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#643939",
    }
});