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
    const handleLocation = (loc) => {
        console.log('location:', loc);
    }
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
                        locations.length > 0 && showSearch ? (
                            <View style={styles.locationsContainer}>
                                {
                                    locations.map((location, index) => {
                                        const showBorder = index + 1 !== locations.length;
                                        return (
                                            <TouchableOpacity
                                                onPress={() => handleLocation(loc)}
                                                key={index}
                                                style={[styles.locationItem, showBorder && styles.locationItemBorder]}
                                            >
                                                <MapPinIcon size={20} color="gray" />
                                                <Text style={styles.locationText}>London, United Kingdom</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        ) : null
                    }
                </View>
                {/* ForeCast Section */}
                <View style={styles.forecastSection}>
                    <Text style={styles.location}>
                        London,
                        <Text style={styles.country}> United Kingdom</Text>
                    </Text>
                    <View style={styles.weatherIconContainer}>
                        <Image
                            source={require("../assets/images/sunny.png")}
                            style={styles.weatherIcon}
                        />
                    </View>
                    <View style={styles.temperatureContainer}>
                        <Text style={styles.temperature}>
                            23°
                        </Text>
                        <Text style={styles.weatherDescription}>
                            Sunny
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Image source={require("../assets/images/wind.png")} style={styles.infoIcon}/>
                            <Text style={styles.infoText}>
                                22km/h
                            </Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Image source={require("../assets/images/drop.png")} style={styles.infoIcon}/>
                            <Text style={styles.infoText}>
                                22%
                            </Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Image source={require("../assets/images/sunrise.png")} style={styles.infoIcon}/>
                            <Text style={styles.infoText}>
                                6:05 AM
                            </Text>
                        </View>
                    </View>
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
        borderRadius: 30,
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
    forecastSection: {
        marginHorizontal: 16,
        justifyContent: 'center',
        flex: 1,
        marginBottom: 8,
    },
    location: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    country: {
        fontSize: 18,
        fontWeight: '600', 
        color: 'rgba(229, 231, 235, 1)', 
    },
    weatherIconContainer: {
        flexDirection: 'row',
        marginVertical: 40,
        justifyContent: 'center',
    },
    weatherIcon: {
        width: 208, 
        height: 208,
    },
    temperatureContainer: {
        alignItems: 'center',
        marginBottom: 8,
    },
    temperature: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 72,
        marginLeft: 20,
    },
    weatherDescription: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25, 
        letterSpacing: 0.025, 
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 18,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoIcon: {
        width: 24, 
        height: 24,
    },
    infoText: {
        color: 'white',
        fontWeight: '600', 
        fontSize: 16, 
        marginLeft: 8,
    },
    locationsContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#D1D5DB', 
        top: 64, 
        borderRadius: 25,
        padding: 12,
        marginTop: 2,
    },
    locationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 4,
        justifyContent: 'flex-start', 
    },
    locationItemBorder: {
        borderBottomWidth: 2,
        borderBottomColor: '#9CA3AF',
    },
    locationText: {
        color: 'black',
        fontSize: 18, 
        marginLeft: 8,
    },
});
