import { IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function History() {
    const router = useRouter();
    const [hist, setHist] = useState([]);

    async function fetchhist() {
        let { data } = await supabase.from('pref').select('hist');
        setHist(data[0].hist.reverse());
    }

    useEffect(() => {
        fetchhist();
    },[])

    function HistoryDisplay({ item }) {
        return (
            <View style = {{ borderBottomWidth: 1}}>
                <Text style = {{fontWeight: "bold", fontSize: 20}}>{display(item[0])}</Text>
                <Text style = {{fontSize:15}}>{item[1]}</Text>
            </View>
        )
    }

    function display(num) {

        switch (num) {
            case 1:
                return "Chinese";
            case 2:
                return "Malaysian";
            case 3:
                return "Indian";           
            case 4:
                return "Japanese";
            case 5:
                return "Korean";
            case 6:
                return "Vietnamese";
            case 7:
                return "Thai";            
            case 8:
                return "Indonesian";
            case 9:
                return "Vegetarian";
            case 10:
                return "Western";
            case 11:
                return "Italian";
            case 12:
                return "Asian";
            default:
                return "Error";
        }
    }

    return (
        <SafeAreaView>
            <View style = {{backgroundColor:'white'}}>
                <IconButton style = {{backgroundColor: 'white'}} icon = 'arrow-left' onPress={() => router.replace('/')}/>
            </View>
            <View>
                <View style = {{borderBottomWidth: 1}}>
                    <Text style = {{fontWeight: "bold", fontSize: 30}}>
                        Recent Recommendations
                    </Text>
                </View>
            <FlatList
                    data = {hist}
                    renderItem = {({item}) => <HistoryDisplay item={item}/>}
                    ListEmptyComponent = {<Text>No Past History</Text>}
                    />
            </View>
        </SafeAreaView>
    )
}