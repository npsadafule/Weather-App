import React, { useCallback, useEffect, useState } from 'react';
import { View, SafeAreaView, TextInput, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../theme';
import  { debounce } from 'lodash';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import {CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { fetchLocations, fetchWeatherForecast } from '../api/weather.js';
import * as Progress from 'react-native-progress';
import { getData, storeData } from '..//utils/asyncStorage.js';

export default function HomeScreen() {
    const [showSearch, toggleSearch] = useState(false);
    const [locations, setLocations] = useState([]);
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(true);
    const [bgClassName, setBgClassName] = useState('bg-sky-500');
    
    const handleLocation = (loc) => {
        //console.log('location:', loc);
        setLocations([]);   
        toggleSearch(false);
        fetchWeatherForecast({
            cityName: loc.name, 
            days: '7'
        }).then(data => {
            setWeather(data);
            setLoading(false);
            storeData("city", loc.name);
            updateBackgroundBasedOnTime(data.location.localtime);
            //console.log('got forecast:', data);
        })
    }
    
    const handleSearch = value => {
        if(value.length > 2) {
            fetchLocations({cityName: value}).then(data => {
            setLocations(data);
            })
        }
    }

    useEffect(() => {
        fetchMyWeatherData();
    },[])

    const fetchMyWeatherData = async() => {
        let myCity =    await getData("city");
        let cityName = "Vancouver";
        if (myCity) cityName = myCity;
        fetchWeatherForecast({
            cityName,
            days: '7'
        }).then(data => {
            setWeather(data);
            setLoading(false);
            updateBackgroundBasedOnTime(data.location.localtime);
        })
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

    const updateBackgroundBasedOnTime = (localtime) => {
        const hour = parseInt(localtime.split(' ')[1].split(':')[0], 10);
        if(hour >= 6 && hour < 18) {
            setBgClassName('bg-sky-500');
        } else {
            setBgClassName('bg-gray-800'); 
        }
    };

    const {current, location} = weather;

    return (
        <View className={`flex-1 relative ${bgClassName}`}>
            <StatusBar style="light" />
            <Image
                blurRadius={30}
                opacity ={0.5}
                source={require("../assets/images/bg.png")}
                className = "absolute h-full w-full"
            />
            {
                loading?(
                    <View className = "flex-1 flex-column justify-center items-center">
                        <Progress.CircleSnail thickness = {10} size={100} color = "#0bb3b2" />
                        <Text className = "text-white text-4xl ml-6">Loading...</Text>
                    </View>
                ):(
                    <SafeAreaView className = "flex flex-1">
                        {/* Search Bar */}
                        <View style={{height: "7%"}} className = "mx-4 relative z-50">
                            <View className = "flex-row  justify-end items-center rounded-full"
                                style = {{backgroundColor: showSearch? theme.bgWhite(0.3):"transparent"}}
                            >
                                {
                                    showSearch?(
                                        <TextInput
                                            onChangeText = {handleTextDebounce}
                                            placeholder='Search city'
                                            placeholderTextColor='lightgray'
                                            className = "pl-6 h-10 pb-1 flex-1 text-base text-white"
                                        />
                                    ):null
                                }
                                <TouchableOpacity
                                    onPress = {() => toggleSearch(!showSearch)}
                                    style={{backgroundColor: theme.bgWhite(0.3)}}
                                    className = "p-3 m-1 rounded-full"
                                >
                                    <MagnifyingGlassIcon color="white" size="25" />
                                </TouchableOpacity>
                            </View>
                            {
                                locations.length > 0 && showSearch ? (
                                    <View className = "abosolute w-full bg-gray-300 top-4 rounded-3xl">
                                        {
                                            locations.map((loc, index) => {
                                                const showBorder = index + 1 !== locations.length;
                                                const borderClass = showBorder? "border-b-2 border-b-gray-400" : " ";
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => handleLocation(loc)}
                                                        key={index}
                                                        className = {"flex-row items-center border-0 p-3 px-4 mb-1" + borderClass}
                                                    >
                                                        <MapPinIcon size={20} color="gray" />
                                                        <Text className = "text-black text-lg ml-2">{loc?.name}, {loc?.country}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                ) : null
                            }
                        </View>
                        {/* ForeCast Section */}
                        <View className = "mx-4 flex justify-around flex-1 mb-2">
                            <Text className = "text-white text-2xl text-center font-bold">
                                {location?.name},
                                <Text className = "text-gray-300 text-2lg font-semibold"> {" " + location?.country}</Text>
                            </Text>
                            <View className = "flex-row justify-center">
                                <Image
                                    source={{uri: 'https:' + current?.condition?.icon}}
                                    className = "w-52 h-52"
                                />
                            </View>
                            <View className = "space-y-2">
                                <Text className = "text-center font-bold text-white text-6xl ml-5">
                                    {current?.temp_c}°
                                </Text>
                                <Text className = "text-center text-white text-xl tracking-widest">
                                    {current?.condition?.text}
                                </Text>
                            </View>
                            <View className = "flex-row justify-between mx-4">
                                <View className = "flex-row space-x-2 item-center">
                                    <Image source={require("../assets/images/wind.png")} className = "w-6 h-6"/>
                                    <Text className = "text-white semi-bold text-base">
                                        {current?.wind_kph}km/h
                                    </Text>
                                </View>
                                <View className = "flex-row space-x-2 item-center">
                                    <Image source={require("../assets/images/drop.png")} className = "w-6 h-6"/>
                                    <Text className = "text-white semi-bold text-base">
                                        {current?.humidity}%
                                    </Text>
                                </View><View className = "flex-row space-x-2 item-center">
                                    <Image source={require("../assets/images/sunrise.png")} className = "w-6 h-6"/>
                                    <Text className = "text-white semi-bold text-base">
                                        {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {/* Future Forecast */}
                        <View className="mb-2 space-y-3">
                            <View className="flex-row items-center mx-5 space-x-2">
                                <CalendarDaysIcon size="22" color="white" />
                                <Text className = "text-white text-base">Daily Forecast</Text>
                            </View>
                            <ScrollView horizontal contentContainerStyle = {{paddingHorizontal: 15}} showsHorizontalScrollIndicator = {false}>
                                {
                                    weather?.forecast?.forecastday?.map((item, index) => {
                                        let date = new Date(item.date); 
                                        let options = {weekday: 'long'};
                                        let dayName = date.toLocaleDateString('en-US', options);
                                        return(
                                            <View 
                                                className = "flex justify-center items-center w-24 rounded-3xl py-3 space-y1 mr-4"
                                                style = {{backgroundColor: theme.bgWhite(0.15) }}>
                                                    <Image source = {{uri: 'https:' + item?.day?.condition?.icon}} className = "h-11 w-11" /> 
                                                    <Text className = "text-white">{dayName}</Text>
                                                    <Text className = "text-white text-xl semi-bold">{item?.day?.avgtemp_c}°</Text>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                    </SafeAreaView>
                )
            }
        </View>
    );
}