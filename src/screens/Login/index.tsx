import React, { useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View, Pressable } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import * as AppAuth from "expo-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../@types";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    useEffect(() => {
        const checkTokenValidity = async () => {
            const accessToken = await AsyncStorage.getItem("token");
            const expirationDate = await AsyncStorage.getItem("expirationDate");
            console.log("acess token", accessToken);
            console.log("expiration date", expirationDate);

            if (accessToken && expirationDate) {
                const currentTime = Date.now();
                if (currentTime < parseInt(expirationDate)) {
                    // here the token is still valid
                    navigation.replace("Tabs");
                } else {
                    // token would be expired so we need to remove it from the async storage
                    AsyncStorage.removeItem("token");
                    AsyncStorage.removeItem("expirationDate");
                }
            }
        }

        checkTokenValidity();
    }, [])

    async function handleAuthentication() {
        const config = {
            issuer: "https://accounts.spotify.com",
            clientId: "6a79ebe921944e5cb0bf98dc550ef936",
            scopes: [
                "user-read-email",
                "user-library-read",
                "user-read-recently-played",
                "user-top-read",
                "playlist-read-private",
                "playlist-read-collaborative",
                "playlist-modify-public" // or "playlist-modify-private"
            ],
            redirectUrl: "exp://26.158.76.190:8081"
        }

        const result = await AppAuth.authAsync(config);
        console.log("🚀 ~ handleAuthentication ~ result:", result)
        if (result.accessToken && result.accessTokenExpirationDate) {
            const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
            AsyncStorage.setItem("token", result.accessToken);
            AsyncStorage.setItem("expirationDate", expirationDate.toString());
            navigation.navigate("Tabs")
        }
    }

    return (
        <LinearGradient colors={["#040306", '#000']} style={{ flex: 1, height: '100%' }}>
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
                {/* Sign with spotify */}
                <Pressable
                    style={styles.signSpotify}
                    onPress={handleAuthentication}
                >
                    <Text style={{ fontWeight: '900' }}>Sign In with spotify</Text>
                </Pressable>
                {/* Sign with phone number */}
                <Pressable style={styles.signInBtn}>
                    <MaterialIcons name="phone-android" size={24} color="white" />
                    <Text style={styles.txtSignInBtn}>Continue with phone number</Text>
                </Pressable>
                {/* Sign with google account */}
                <Pressable style={styles.signInBtn}>
                    <AntDesign name="google" size={24} color="#DB4437" />
                    <Text style={styles.txtSignInBtn}>Sign in with Google</Text>
                </Pressable>
                {/* Sign with facebook */}
                <Pressable style={styles.signInBtn}>
                    <Entypo name="facebook" size={24} color="#4267B2" />
                    <Text style={styles.txtSignInBtn}>Sign In with facebook</Text>
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
    },
    signInBtn: {
        backgroundColor: "#131624",
        padding: 10,
        marginHorizontal: 'auto',
        width: 300,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginVertical: 10,
        borderColor: "#C0C0C0",
        borderWidth: 0.8
    },
    txtSignInBtn: {
        fontWeight: "800",
        color: "white",
        textAlign: "center",
        flex: 1
    },
})