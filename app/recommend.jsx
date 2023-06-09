import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
import { Button , IconButton } from "react-native-paper";
import { useAuth } from "../contexts/auth";
import { useRouter } from "expo-router";

export default function Recommend() {
    const [pref,setPref] = useState([])
    const [refreshing,setRefreshing] = useState(false);
    const [textdisplay, setTextdisplay] = useState('Click Button for Recommendation');
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

        const { error } = await supabase.from('pref').update({ [selected] : pref[selected.toString()] + 1 , total : pref.total + 1}).eq('id', user.id);
            if (error != null) {
                setErrMsg(error.message);
                return;
            }

        router.replace('/')
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
            case "1":
                setTextdisplay("Chinese");
                break;
            
            case "2":
                setTextdisplay("Malaysian");
                break;

            case "3":
                setTextdisplay("Indian");
                break;
            
            case "4":
                setTextdisplay("Japanese");
                break;

            case "5":
                setTextdisplay("Korean");
                break;
            
            case "6":
                setTextdisplay("Vietnamese");
                break;

            case "7":
                setTextdisplay("Thai");
                break;
            
            case "8":
                setTextdisplay("Indonesian");
                break;

            case "9":
                setTextdisplay("Vegetarian");
                break;
            
            case "10":
                setTextdisplay("Western");
                break;

            case "11":
                setTextdisplay("Italian");
                break;
            
            case "12":
                setTextdisplay("Asian");
                break;
            default:
                setTextdisplay("Error");
        }
    }


    return (
        <SafeAreaView style = {{flex:1}}>
            <View style = {{backgroundColor:'white'}}>
                <IconButton style = {{backgroundColor: 'white'}} icon = 'arrow-left' onPress={() => router.back()}/>
            </View>
            <View style = {{flex: 1, alignItems:'center', justifyContent:'center', alignContent:'center'}}>
                <Text>{textdisplay}</Text>
                <Button onPress= {buttonPress}>{!clicked ? "Press" : "Recommend Something Else"}</Button>
                {clicked && <Button onPress= {() => updatePref()}>I choose this</Button>}
                {errMsg!=="" && <Text>{errMsg}</Text>}
                
            </View>
        </SafeAreaView>
    )
}