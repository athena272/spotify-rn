import React from 'react'
import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
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
    }
})