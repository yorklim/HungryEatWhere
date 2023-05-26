import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper"
import { useRouter } from "expo-router";
import * as Location from 'expo-location';
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from "../key";
import Constants from "expo-constants";



export default function Nearbypage() {
    const router = useRouter();
    const [errMsg,setErrMsg] = useState('');
    const [mapregion, setMapregion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.007,
        longitudeDelta: 0.002
    })

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if ( status !== 'granted') {
            setErrMsg('Permission to access location was denied');
            console.log(errMsg);
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setMapregion ({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.007,
            longitudeDelta: 0.002
        });
    }

    return (
        <SafeAreaView style ={{flex : 1}}>
            <MapView 
                style ={{flex: 1, width: '100%', height: '100%'}}
                provider={PROVIDER_GOOGLE}
                region = {mapregion}
            >
                <Marker
                    coordinate = {{
                        latitude : mapregion.latitude,
                        longitude: mapregion.longitude

                    }}
                />
            </MapView>
            <View style={styles.search}>
                <IconButton style = {{backgroundColor: 'white'}} icon = 'arrow-left' onPress={() => router.back()}/>
                {/* <TextInput style={{flex:1}} value = {address} onChangeText={setAddress}/>
                <IconButton icon = 'arrow-right' onPress={geocode}/> */}
                <GooglePlacesAutocomplete
                styles={{ textInput: styles.input}}
                placeholder='Search'
                fetchDetails
                onPress={(data, details = null) => {
                    setMapregion ({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: 0.007,
                        longitudeDelta: 0.002
                    });
                }}
                query={{
                    key: GOOGLE_API_KEY,
                    language: 'en',
                }}
            />
                <IconButton style = {{backgroundColor: 'white'}} icon = 'crosshairs-gps' onPress={() =>getLocation()}/>
            </View>
            <View style={{flex : 2}}>
                <Text> Nearby Stalls </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    search: {
        flexDirection:"row", 
        alignItems:'flex-start',
        position:'absolute',
        top: Constants.statusBarHeight,
        backgroundColor: "white",
    },
    input: {
        top: 5,
    }
});