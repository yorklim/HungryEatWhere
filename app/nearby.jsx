import { FlatList, Pressable, StyleSheet, View, Image } from "react-native";
import { IconButton, Text } from "react-native-paper"
import { useRouter } from "expo-router";
import * as Location from 'expo-location';
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from "../key";
import Constants from "expo-constants";
import { supabase } from "../lib/supabase";



export default function Nearbypage() {
    const router = useRouter();
    const [errMsg,setErrMsg] = useState('');
    const [mapregion, setMapregion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.007,
        longitudeDelta: 0.002
    })
    const [currentloc, setCurrentloc] = useState({});
    const [restaurant, setRestaurant] = useState([]);
    const [refreshing, setRefereshing] = useState(false);

    async function fetchrestaurant() {
        let { data } = await supabase.from('restaurant').select().gt('lat', mapregion.latitude - 0.005).lt('lat', mapregion.latitude + 0.005)
            .gt('lon', mapregion.longitude - 0.005).lt('lon', mapregion.longitude + 0.005);
        setRestaurant(data.sort((a,b) => compareDistanceFromUser(a,b)));
    }

    useEffect(() => {
        fetchrestaurant();
    }, [])

    useEffect(() => {
        fetchrestaurant();
        setRefereshing(false);
    }, [refreshing])

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

        setCurrentloc ({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.007,
            longitudeDelta: 0.002
        });

        setRefereshing(true);
    }

    function RestaurantDisplay({ store }) {
        return <Pressable onPress={()=> setMapregion({
            latitude: store.lat,
            longitude: store.lon,
            latitudeDelta: 0.007,
            longitudeDelta: 0.002})}>
            <View style = {{flexDirection: 'row', alignItems: "center"}}>
                <Image 
                    source = {{uri: store.image_url}}
                    style = {{
                        height: 100,
                        width: 100
                    }}
                />
                <View style= {{margin: 10}}>
                <Text>{store.address}</Text>
                </View>
            </View>
        </Pressable>
    }
    function compareDistanceFromUser(loc1, loc2) {
        var loc1dist = getDistanceFromLatLonInKm(loc1.lat,loc1.lon,mapregion.latitude,mapregion.longitude);
        var loc2dist = getDistanceFromLatLonInKm(loc2.lat,loc2.lon,mapregion.latitude,mapregion.longitude);
        return loc1dist - loc2dist;
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
                        latitude : currentloc.latitude,
                        longitude: currentloc.longitude

                    }}>

                    <Image
                        style = {{height:30, width: 30}}
                        source ={require("../assets/userpin.png")}/>
                </Marker>

                {restaurant.map((marker, index) => (
                    <Marker
                        key = {index}
                        coordinate={{
                            latitude: marker.lat,
                            longitude: marker.lon
                        }}
                        title= {marker.name}>
                            <Image
                                style = {{height:30, width: 30}}
                                source ={require("../assets/restaurantpin2.png")}/>
                    </Marker>
                ))}


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

                    setCurrentloc ({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: 0.007,
                        longitudeDelta: 0.002
                    });
            
                    setRefereshing(true)
                }}
                query={{
                    key: GOOGLE_API_KEY,
                    language: 'en',
                }}
            />
                <IconButton style = {{backgroundColor: 'white'}} icon = 'crosshairs-gps' onPress={() =>getLocation()}/>
            </View>
            <View style={{flex : 2}}>
                <FlatList
                    data = {restaurant}
                    renderItem = {({item}) => <RestaurantDisplay store={item}/>}
                />
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

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

