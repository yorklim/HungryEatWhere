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
    const [selected, setSelected] = useState('Click Button for Recommendation');
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

        if (selected == "1") {
            const { error } = await supabase.from('pref').update({ 1 : pref[selected.toString()] + 1 , total : pref.total + 1}).eq('id', user.id);
            if (error != null) {
                setErrMsg(error.message);
                return;
            }
        } else if (selected == "2") {
            const { error } = await supabase.from('pref').update({ 2 : pref[selected.toString()] + 1 , total : pref.total + 1}).eq('id', user.id);
            if (error != null) {
                setErrMsg(error.message);
                return;
            }
        } else if (selected == "3") {
            const { error } = await supabase.from('pref').update({ 3 : pref[selected.toString()] + 1 , total : pref.total + 1}).eq('id', user.id);
            if (error != null) {
                setErrMsg(error.message);
                return;
            }
        } else if (selected == "4") {
            const { error } = await supabase.from('pref').update({ 4 : pref[selected.toString()] + 1 , total : pref.total + 1}).eq('id', user.id);
            if (error != null) {
                setErrMsg(error.message);
                return;
            }
        } else if (selected == "5") {
            const { error } = await supabase.from('pref').update({ 5 : pref[selected.toString()] + 1 , total : pref.total + 1}).eq('id', user.id);
            if (error != null) {
                setErrMsg(error.message);
                return;
            }
        } else {
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

        setClicked(true)
        let num = getRandomArbitrary(0, pref.total - 1);
        let selected;

        for (let index = 1; index < 6; index++) {
            if (pref[index.toString()] > num) {
                selected = index;
                break
            } else {
                num = num - pref[index.toString()];
            }
        }

        return selected;
    }


    return (
        <SafeAreaView style = {{flex:1}}>
            <View style = {{backgroundColor:'white'}}>
                <IconButton style = {{backgroundColor: 'white'}} icon = 'arrow-left' onPress={() => router.back()}/>
            </View>
            <View style = {{flex: 1, alignItems:'center', justifyContent:'center', alignContent:'center'}}>
                <Text>{selected}</Text>
                <Button onPress= {() => setSelected(selectcuisine())}>{!clicked ? "Press" : "Recommend Something Else"}</Button>
                {clicked && <Button onPress= {() => updatePref()}>I choose this</Button>}
                {errMsg!=="" && <Text>{errMsg}</Text>}
                
            </View>
        </SafeAreaView>
    )
}