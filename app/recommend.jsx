import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
import { Button , IconButton } from "react-native-paper";
import { useAuth } from "../contexts/auth";
import { useRouter } from "expo-router";

export default function Recommend() {
    const [pref,setPref] = useState([])
    const [refreshing,setRefreshing] = useState(false);
    const [textdisplay, setTextdisplay] = useState(' ');
    const [selected, setSelected] = useState("");
    const [clicked,setClicked] = useState(false)
    const { user } = useAuth();
    const [errMsg,setErrMsg] = useState("");
    const router = useRouter();
    useEffect(() => {
        fetchprofile();
    },[])

    useEffect(()=> {
        fetchprofile();
        setRefreshing(false);
    },[refreshing])

    const updatePref = async () => {

        if (pref.hist == null) {
            pref.hist = new Array()
        }

        const temp = new Array(selected, new Date().toString());
        console.log(temp)
        
        pref.hist.push(temp);

        const { error } = await supabase.from('pref').update({ [selected] : pref[selected.toString()] + 1 , total : pref.total + 1, hist : pref.hist}).eq('id', user.id);
            if (error != null) {
                setErrMsg(error.message);
                return;
            }

        router.push({
            pathname: '/reconearby',
            params : {cuisine: textdisplay}
        })
    }

    async function fetchprofile() {
        let { data } = await supabase.from('pref').select('*');
        setPref(data[0]);
    }

    function getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function selectcuisine() {

        if (pref.total == 0) {
            return "Please Setup Calibration in Profile"
        }

        console.log(pref)

        setClicked(true)
        let num = getRandomArbitrary(0, pref.total - 1);
        let selected;

        for (let index = 1; index < 13; index++) {
            if (pref[index.toString()] > num) {
                selected = index;
                break
            } else {
                num = num - pref[index.toString()];
            }
        }

        return selected;
    }

    function buttonPress() {
        var temp = selectcuisine();
        setSelected(temp);
        switch (temp) {
            case 1:
                setTextdisplay("Chinese");
                break;
            
            case 2:
                setTextdisplay("Malaysian");
                break;

            case 3:
                setTextdisplay("Indian");
                break;
            
            case 4:
                setTextdisplay("Japanese");
                break;

            case 5:
                setTextdisplay("Korean");
                break;
            
            case 6:
                setTextdisplay("Vietnamese");
                break;

            case 7:
                setTextdisplay("Thai");
                break;
            
            case 8:
                setTextdisplay("Indonesian");
                break;

            case 9:
                setTextdisplay("Vegetarian");
                break;
            
            case 10:
                setTextdisplay("Western");
                break;

            case 11:
                setTextdisplay("Italian");
                break;

            default:
                setTextdisplay("Error");
        }
    }


    return (
        <SafeAreaView style = {styles.mainContainer}>
            <View style = {styles.topbar}>
                <IconButton style = {{backgroundColor: '#FFEDD2'}} icon = 'arrow-left' onPress={() => router.replace('/')}/>
            </View>

            <View style = {styles.content}>
                <Text style= {styles.message}>{textdisplay}</Text>
                <View styles= {styles.button}>
                    <TouchableOpacity onPress= {buttonPress} style= {styles.button}>{!clicked ? <Text style = {styles.font}>Click to generate</Text> : <Text style = {styles.font}>Recommend Something Else</Text>}</TouchableOpacity>
                {clicked && <TouchableOpacity onPress= {() => updatePref()} style= {styles.button}><Text style= {styles.font}>I choose this</Text></TouchableOpacity>}
                {errMsg!=="" && <Text>{errMsg}</Text>}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles =StyleSheet.create({
    
    topbar: {
        backgroundColor: "#FFEDD2",
        height: 70,
        justifyContent: "center",
    },

    mainContainer: {
        flex:1,
        backgroundColor: "#FFEDD2",
    },

    content: {
        backgroundColor: "#FB9999",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        alignContent:'center',
    },

    font: {
        color: "#643939",
        fontWeight: "600",
        fontSize: 20,
        // alignSelf: "center",
    },

    button: {
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: '#FFCECE',
        justifyContent: 'center',
        alignItems:'center',
        underlayColor : 'white',
        padding: 20,
        paddingHorizontal: 40,
        margin: 10
    },

    message: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        margin: 10
    }
})