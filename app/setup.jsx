import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Text, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/auth";

export default function Setup() {
    const router = useRouter();
    const [value1,setValue1] = useState(0);
    const [value2,setValue2] = useState(0);
    const [value3,setValue3] = useState(0);
    const [value4,setValue4] = useState(0);
    const [value5,setValue5] = useState(0);
    const [errMsg, setErrMsg] = useState('');
    const { user } = useAuth();

    const handleSubmit = async () => {

        const total = value1 + value2 + value3 + value4 + value5;

        if (total == 0) {
            setErrMsg("New name cannot be Values cannot be 0 for all cuisines");
            return;
        }

        const { error } = await supabase.from('pref').update({1:value1, 2:value2, 3:value3, 4:value4, 5:value5, total:total}).eq('id', user.id)

        if (error != null) {
            setErrMsg(error.message);
            return;
        }

        router.replace('/profile')

    }

    return (
    <SafeAreaView>
        <View style = {{backgroundColor:'white'}}>
            <IconButton style = {{backgroundColor: 'white'}} icon = 'arrow-left' onPress={() => router.back()}/>
        </View>
        <ScrollView>
            <View>
                <Text>If you have already done the set up before, resubmitting will reset all past data</Text>
                <Text>Set value of cuisine to 0 if you do not want to be recommend that cuisine at all</Text>
            </View>

            <View>
                <Text>Food Cat A : {value1}</Text>
                <View style = {styles.slider}>
                    <Text style = {{margin: 10}}>0</Text>
                    <Slider
                        style = {{flex: 1}}
                        minimumValue={0}
                        maximumValue={10}
                        value={value1}
                        onValueChange={(a) => setValue1(Math.trunc(a))}
                        tapToSeek={false}
                    />
                    <Text style = {{margin: 10}}>10</Text>
                </View>
            </View>

            <View>
                <Text>Food Cat B : {value2}</Text>
                <View style = {styles.slider}>
                    <Text style = {{margin: 10}}>0</Text>
                    <Slider
                        style = {{flex: 1}}
                        minimumValue={0}
                        maximumValue={10}
                        value={value2}
                        onValueChange={(a) => setValue2(Math.trunc(a))}
                        tapToSeek={false}
                    />
                    <Text style = {{margin: 10}}>10</Text>
                </View>
            </View>

            <View>
                <Text>Food Cat C : {value3}</Text>
                <View style = {styles.slider}>
                    <Text style = {{margin: 10}}>0</Text>
                    <Slider
                        style = {{flex: 1}}
                        minimumValue={0}
                        maximumValue={10}
                        value={value3}
                        onValueChange={(a) => setValue3(Math.trunc(a))}
                        tapToSeek={false}
                    />
                    <Text style = {{margin: 10}}>10</Text>
                </View>
            </View>

            <View>
                <Text>Food Cat D : {value4}</Text>
                <View style = {styles.slider}>
                    <Text style = {{margin: 10}}>0</Text>
                    <Slider
                        style = {{flex: 1}}
                        minimumValue={0}
                        maximumValue={10}
                        value={value4}
                        onValueChange={(a) => setValue4(Math.trunc(a))}
                        tapToSeek={false}
                    />
                    <Text style = {{margin: 10}}>10</Text>
                </View>
            </View>

            <View>
                <Text>Food Cat E : {value5}</Text>
                <View style = {styles.slider}>
                    <Text style = {{margin: 10}}>0</Text>
                    <Slider
                        style = {{flex: 1}}
                        minimumValue={0}
                        maximumValue={10}
                        value={value5}
                        onValueChange={(a) => setValue5(Math.trunc(a))}
                        tapToSeek={false}
                    />
                    <Text style = {{margin: 10}}>10</Text>
                </View>
            </View>
            
            <View>
                <Button onPress={handleSubmit}>Submit</Button>
                {errMsg !== "" && <Text>{errMsg}</Text>}
            </View>

        </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    slider: {
        flexDirection:'row',
        alignItems:'center',
    }
});