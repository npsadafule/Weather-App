import React, { useState } from 'react';
import { View, SafeAreaView, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../theme';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import {MapPinIcon } from 'react-native-heroicons/solid';
const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
    const [showSearch, toggleSearch] = useState(false);
    const [locations, setLocations] = useState([1,2,3]);
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image
                blurRadius={30}
                source={require("../assets/images/bg.png")}
                style={styles.backgroundImage}
            />
            <SafeAreaView style={styles.safeArea}>
                {/* Search Bar */}
                <View style={styles.searchBarContainer}>
                    <View style={[styles.searchBar, {backgroundColor: showSearch? theme.bgWhite(0.2): 'transparent'}]}>
                        {
                            showSearch?(
                                <TextInput
                                    placeholder='Search city'
                                    placeholderTextColor='lightgray'
                                    style={styles.textInput}
                                />
                            ):null
                        }
                        <TouchableOpacity
                            onPress = {() => toggleSearch(!showSearch)}
                            style={[styles.iconButton, {backgroundColor: theme.bgWhite(0.3)}]}
                        >
                            <MagnifyingGlassIcon color="white" size={25} />
                        </TouchableOpacity>
                    </View>
                    {
                        locations.length > 0 && showSearch?(
                            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                                {
                                    locations.map((location, index) => {
                                        let showBorder = index+1 != locations.length;
                                        let borderClass = showBorder? 'border-b-2-gray-400': '';
                                        return (
                                            <TouchableOpacity
                                                key = {index}
                                                className={"flex-row items-center justify-between border-0 p-3 px-4 mb-1 " + borderClass }
                                            >
                                                <MapPinIcon size="20" color="gray" />
                                                <Text className = "text-black text-lg ml-2">London, United Kingdom</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        ):null
                    }
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    backgroundImage: {
        position: 'absolute',
        width: width,
        height: height,
    },
    safeArea: {
        flex: 1,
    },
    searchBarContainer: {
        height: '7%',
        marginHorizontal: 16,
        position: 'relative',
        zIndex: 50,
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 999,
        padding: 10,
    },
    textInput: {
        flex: 1,
        color: 'white',
        paddingLeft: 12,
    },
    iconButton: {
        borderRadius: 999,
        padding: 8,
        marginLeft: 8,
    },
});
