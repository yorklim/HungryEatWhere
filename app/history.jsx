import { IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { StyleSheet, FlatList, View } from "react-native";
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
            <View style={styles.box}>
                <Text style = {styles.cuisine}>{display(item[0])}</Text>
                <Text style = {styles.description}>{item[1]}</Text>
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
        <SafeAreaView style= {{backgroundColor: "#FFCECE", flex: 1}}>
            <View style = {{backgroundColor:'#FFCECE'}}>
                <IconButton style = {{backgroundColor: '#FFCECE'}} icon = 'arrow-left' onPress={() => router.replace('/')}/>
            </View>
            <View>
                <View style>
                    <Text style = {styles.header}>
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
const styles =StyleSheet.create({
    header: {
        fontWeight: "bold", 
        fontSize: 30,
        alignSelf: "center",
        color: "#5A1B1B",
        marginBottom: 10,
    },

    box: {
        borderRadius: 20,
        backgroundColor: "#FB9999",
        alignItems: "center",
        margin: 5,
        borderWidth:2,
        padding: 5,
        borderColor: "white"
    },

    content: {
        flex: 1,
        alignItems: "space-around",

    },

    cuisine: {
        fontSize: 18,
        color: "5A1B1B",
        fontWeight: "bold",
        marginBottom: 3
    },

    description: {
        fontSize: 15,
        color: "#5A1B1B",
    }

})

