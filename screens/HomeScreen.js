import React, { useCallback, useState } from 'react';
import { View, SafeAreaView, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../theme';
import  { debounce } from 'lodash';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import {CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { fetchLocations } from '../api/weather.js';

export default function HomeScreen() {
    const [showSearch, toggleSearch] = useState(false);
    const [locations, setLocations] = useState([1,2,3]);
    const handleLocation = (loc) => {
        console.log('location:', loc);
    }
    const handleSearch = value => {
        if(value.length > 2) {
            fetchLocations({cityName: value}).then(data => {
            console.log('got Locations:', data);
            })
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 1000), []);
    return (
        <View className = "flex-1 relative">
            <StatusBar style="light" />
            <Image
                blurRadius={30}
                source={require("../assets/images/bg.png")}
                className = "absolute h-full w-full"
            />
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
                                    locations.map((location, index) => {
                                        const showBorder = index + 1 !== locations.length;
                                        const borderClass = showBorder? "border-b-2 border-b-gray-400" : " ";
                                        return (
                                            <TouchableOpacity
                                                onPress={() => handleLocation(loc)}
                                                key={index}
                                                className = {"flex-row items-center border-0 p-3 px-4 mb-1" + borderClass}
                                            >
                                                <MapPinIcon size={20} color="gray" />
                                                <Text className = "text-black text-lg ml-2">London, United Kingdom</Text>
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
                        London,
                        <Text className = "text-gray-300 text-2lg font-semibold"> United Kingdom</Text>
                    </Text>
                    <View className = "flex-row justify-center">
                        <Image
                            source={require("../assets/images/sunny.png")}
                            className = "w-52 h-52"
                        />
                    </View>
                    <View className = "space-y-2">
                        <Text className = "text-center font-bold text-white text-6xl ml-5">
                            23°
                        </Text>
                        <Text className = "text-center text-white text-xl tracking-widest">
                            Sunny
                        </Text>
                    </View>
                    <View className = "flex-row justify-between mx-4">
                        <View className = "flex-row space-x-2 item-center">
                            <Image source={require("../assets/images/wind.png")} className = "w-6 h-6"/>
                            <Text className = "text-white semi-bold text-base">
                                22km/h
                            </Text>
                        </View>
                        <View className = "flex-row space-x-2 item-center">
                            <Image source={require("../assets/images/drop.png")} className = "w-6 h-6"/>
                            <Text className = "text-white semi-bold text-base">
                                10%
                            </Text>
                        </View><View className = "flex-row space-x-2 item-center">
                            <Image source={require("../assets/images/sunrise.png")} className = "w-6 h-6"/>
                            <Text className = "text-white semi-bold text-base">
                                6:30 AM
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
                    <ScrollView horizontal contentContainerStyle = {{paddingHorizontal: 15}}>
                        <View 
                            className = "flex justify-center items-center w-24 rounded-3xl py-3 space-y1 mr-4"
                            style = {{backgroundColor: theme.bgWhite(0.15) }}>
                                <Image source = {require("../assets/images/heavyrain.png")} className = "h-11 w-11" /> 
                                <Text className = "text-white">Monday</Text>
                                <Text className = "text-white text-xl semi-bold">23°</Text>
                        </View>
                        <View 
                            className = "flex justify-center items-center w-24 rounded-3xl py-3 space-y1 mr-4"
                            style = {{backgroundColor: theme.bgWhite(0.15) }}>
                                <Image source = {require("../assets/images/heavyrain.png")} className = "h-11 w-11" /> 
                                <Text className = "text-white">Tuesday</Text>
                                <Text className = "text-white text-xl semi-bold">23°</Text>
                        </View>
                        <View 
                            className = "flex justify-center items-center w-24 rounded-3xl py-3 space-y1 mr-4"
                            style = {{backgroundColor: theme.bgWhite(0.15) }}>
                                <Image source = {require("../assets/images/heavyrain.png")} className = "h-11 w-11" /> 
                                <Text className = "text-white">Wednesday</Text>
                                <Text className = "text-white text-xl semi-bold">23°</Text>
                        </View>
                        <View 
                            className = "flex justify-center items-center w-24 rounded-3xl py-3 space-y1 mr-4"
                            style = {{backgroundColor: theme.bgWhite(0.15) }}>
                                <Image source = {require("../assets/images/heavyrain.png")} className = "h-11 w-11" /> 
                                <Text className = "text-white">Thursday</Text>
                                <Text className = "text-white text-xl semi-bold">23°</Text>
                        </View>
                        <View 
                            className = "flex justify-center items-center w-24 rounded-3xl py-3 space-y1 mr-4"
                            style = {{backgroundColor: theme.bgWhite(0.15) }}>
                                <Image source = {require("../assets/images/heavyrain.png")} className = "h-11 w-11" /> 
                                <Text className = "text-white">Friday</Text>
                                <Text className = "text-white text-xl semi-bold">23°</Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    );
}