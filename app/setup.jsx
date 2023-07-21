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
    const [value6,setValue6] = useState(0);
    const [value7,setValue7] = useState(0);
    const [value8,setValue8] = useState(0);
    const [value9,setValue9] = useState(0);
    const [value10,setValue10] = useState(0);
    const [value11,setValue11] = useState(0);
    const [errMsg, setErrMsg] = useState('');
    const { user } = useAuth();

    const handleSubmit = async () => {

        const total = value1 + value2 + value3 + value4 + value5 + value6 + value7 + value8 + value9 + value10 + value11;

        if (total == 0) {
            setErrMsg("Values cannot be 0 for all cuisines");
            return;
        }

        const { error } = await supabase.from('pref').update({1:value1, 2:value2, 3:value3, 4:value4, 5:value5, 6:value6, 7:value7, 8:value8, 9:value9, 10:value10, 11:value11, total:total}).eq('id', user.id)

        if (error != null) {
            setErrMsg(error.message);
            return;
        }

        router.replace('/profile')

    }

    return (
    <SafeAreaView style= {{backgroundColor: "#FFCECE"}}>
        <View style = {{backgroundColor:'#FFCECE'}}>
            <IconButton style = {{backgroundColor: '#FFCECE'}} icon = 'arrow-left' onPress={() => router.back()}/>
        </View>
        <ScrollView>
            <View style={styles.textBlock}>
                <Text style= {styles.bigTexts}>Resubmitting will reset all past data {"\n"}</Text>
                <Text style= {styles.texts}>0 - Do not want to be recommended this cuisine</Text>
                <Text style= {styles.texts}>1 - Recommend me this seldomly</Text>
                <Text style= {styles.texts}>10- Recommend me this frequently</Text>
            </View>

            <View style= {styles.content}>
                <View>
                    <Text>Chinese : {value1}</Text>
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
                    <Text>Malaysian : {value2}</Text>
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
                    <Text>Indian : {value3}</Text>
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
                    <Text>Japanese : {value4}</Text>
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
                    <Text>Korean : {value5}</Text>
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
                    <Text>Vietnamese : {value6}</Text>
                    <View style = {styles.slider}>
                        <Text style = {{margin: 10}}>0</Text>
                        <Slider
                            style = {{flex: 1}}
                            minimumValue={0}
                            maximumValue={10}
                            value={value6}
                            onValueChange={(a) => setValue6(Math.trunc(a))}
                            tapToSeek={false}
                        />
                        <Text style = {{margin: 10}}>10</Text>
                    </View>
                </View>

                <View>
                    <Text>Thai : {value7}</Text>
                    <View style = {styles.slider}>
                        <Text style = {{margin: 10}}>0</Text>
                        <Slider
                            style = {{flex: 1}}
                            minimumValue={0}
                            maximumValue={10}
                            value={value7}
                            onValueChange={(a) => setValue7(Math.trunc(a))}
                            tapToSeek={false}
                        />
                        <Text style = {{margin: 10}}>10</Text>
                    </View>
                </View>

                <View>
                    <Text>Indonesian : {value8}</Text>
                    <View style = {styles.slider}>
                        <Text style = {{margin: 10}}>0</Text>
                        <Slider
                            style = {{flex: 1}}
                            minimumValue={0}
                            maximumValue={10}
                            value={value8}
                            onValueChange={(a) => setValue8(Math.trunc(a))}
                            tapToSeek={false}
                        />
                        <Text style = {{margin: 10}}>10</Text>
                    </View>
                </View>

                <View>
                    <Text>Vegetarian : {value9}</Text>
                    <View style = {styles.slider}>
                        <Text style = {{margin: 10}}>0</Text>
                        <Slider
                            style = {{flex: 1}}
                            minimumValue={0}
                            maximumValue={10}
                            value={value9}
                            onValueChange={(a) => setValue9(Math.trunc(a))}
                            tapToSeek={false}
                        />
                        <Text style = {{margin: 10}}>10</Text>
                    </View>
                </View>
                
                <View>
                    <Text>Western : {value10}</Text>
                    <View style = {styles.slider}>
                        <Text style = {{margin: 10}}>0</Text>
                        <Slider
                            style = {{flex: 1}}
                            minimumValue={0}
                            maximumValue={10}
                            value={value10}
                            onValueChange={(a) => setValue10(Math.trunc(a))}
                            tapToSeek={false}
                        />
                        <Text style = {{margin: 10}}>10</Text>
                    </View>
                </View>

                <View>
                    <Text>Italian : {value11}</Text>
                    <View style = {styles.slider}>
                        <Text style = {{margin: 10}}>0</Text>
                        <Slider
                            style = {{flex: 1}}
                            minimumValue={0}
                            maximumValue={10}
                            value={value11}
                            onValueChange={(a) => setValue11(Math.trunc(a))}
                            tapToSeek={false}
                        />
                        <Text style = {{margin: 10}}>10</Text>
                    </View>
                </View>
            

                <View style = {{marginBottom: 50}}>
                    <Button onPress={handleSubmit}><Text style= {{color: "#5A1B1B"}}>Submit</Text></Button>
                    {errMsg !== "" && <Text>{errMsg}</Text>}
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    slider: {
        flexDirection:'row',
        alignItems:'center',
    },

    textBlock: {
        backgroundColor: "#FB9999",
        borderRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: 397,
        height: "17%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",

    },

    bigTexts: {
        color: "white",
        alignSelf: "center",
        fontWeight: 600,
        fontSize: 20
    },

    texts: {
        color: "white",
        alignSelf: "center",
        fontWeight: 600,
    },

    content: {
        paddingTop: 10,
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#FFCECE",
    }
});