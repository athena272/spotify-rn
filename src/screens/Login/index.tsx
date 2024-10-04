import React from 'react'
import { StyleSheet, Text, SafeAreaView, View, Pressable } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";

export default function Login() {
    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
            <SafeAreaView>
                <View style={{ height: 80 }} />
                <Entypo
                    style={styles.iconSpotify}
                    name="spotify"
                    size={80}
                    color="white"
                />
                <Text style={styles.milionsSongs}                >
                    Millions of Songs Free on spotify!
                </Text>
                <View style={{ height: 80 }} />
                <Pressable style={styles.signSpotify}>
                    <Text>Sign In with spotify</Text>
                </Pressable>
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    iconSpotify: {
        textAlign: "center",
    },
    milionsSongs: {
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 40,
    },
    signSpotify: {
        backgroundColor: "#1DB954",
        padding: 10,
        marginHorizontal: 'auto',
        width: 300,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10
    }
})