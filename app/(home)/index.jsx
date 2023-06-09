import { useRouter } from "expo-router";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Homepage() {
    const router = useRouter();

    return (
        <SafeAreaView style = {{flex : 1 ,gap : 10}}>
            <View style = {styles.topbar}>
                <Text style = {{flex : 1 , marginLeft:10, fontSize:25}}>Home Page</Text>
                <Image style = {styles.icon}
                    source = {require("../../assets/profilepic.png")} width ='100' height='100'/>
            </View>
            <View style = {styles.content}>

            <TouchableOpacity style = {styles.button} onPress={() => router.push('/recommend')}>
                    <Text style = {styles.buttontext}>Recommend Me</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => router.push('/nearby')}>
                    <Text style = {styles.buttontext}>Nearby Restuarant</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => router.push('/')}>
                    <Text style = {styles.buttontext}>NIL</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles =StyleSheet.create({
    icon: {
        height:'90%',
        width: null,
        aspectRatio: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        margin: 2,

    },

    topbar: {
        backgroundColor: 'orange',
        flexDirection: 'row',
        alignItems:'center',
        flex : 1
    },

    content: {
        flex : 9,
        flexDirection: 'column',
        alignItems: "center",
        gap: 10
    },

    button : {
        height: 100,
        width: '95%',
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems:'center',
        underlayColor : 'orange'
    },
});