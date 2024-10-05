import React, { useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Pressable } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../@types";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const clientId = "6a79ebe921944e5cb0bf98dc550ef936";
const redirectUri = AuthSession.makeRedirectUri({
    native: "your.app://redirect", // Substitua por seu esquema de URI
});

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
                    // Token ainda é válido
                    navigation.replace("Tabs");
                } else {
                    // Token expirado, removendo do armazenamento assíncrono
                    await AsyncStorage.removeItem("token");
                    await AsyncStorage.removeItem("expirationDate");
                }
            }
        };

        checkTokenValidity();
    }, []);

    async function handleAuthentication() {
        const redirectUri = AuthSession.makeRedirectUri({
            native: "your.app://redirect", // Substitua por seu esquema de URI
        });

        const authRequest = await AuthSession.loadAsync({
            clientId,
            scopes: [
                "user-read-email",
                "user-library-read",
                "user-read-recently-played",
                "user-top-read",
                "playlist-read-private",
                "playlist-read-collaborative",
                "playlist-modify-public",
            ],
            redirectUri,
        });

        const result = await authRequest.authorizeAsync({ useProxy: true });

        if (result.type === "success" && result.params.access_token) {
            const expirationTime = Date.now() + parseInt(result.params.expires_in) * 1000;
            await AsyncStorage.setItem("token", result.params.access_token);
            await AsyncStorage.setItem("expirationDate", expirationTime.toString());
            navigation.navigate("Tabs");
        }
    }

    return (
        <LinearGradient colors={["#040306", '#000']} style={{ flex: 1, height: '100%' }}>
            <SafeAreaView>
                <View style={{ height: 80 }} />
                <Entypo style={styles.iconSpotify} name="spotify" size={80} color="white" />
                <Text style={styles.milionsSongs}>Millions of Songs Free on Spotify!</Text>
                <View style={{ height: 80 }} />
                {/* Sign in with Spotify */}
                <Pressable style={styles.signSpotify} onPress={handleAuthentication}>
                    <Text style={{ fontWeight: '900' }}>Sign In with Spotify</Text>
                </Pressable>
                {/* Sign in with phone number */}
                <Pressable style={styles.signInBtn}>
                    <MaterialIcons name="phone-android" size={24} color="white" />
                    <Text style={styles.txtSignInBtn}>Continue with phone number</Text>
                </Pressable>
                {/* Sign in with Google account */}
                <Pressable style={styles.signInBtn}>
                    <AntDesign name="google" size={24} color="#DB4437" />
                    <Text style={styles.txtSignInBtn}>Sign in with Google</Text>
                </Pressable>
                {/* Sign in with Facebook */}
                <Pressable style={styles.signInBtn}>
                    <Entypo name="facebook" size={24} color="#4267B2" />
                    <Text style={styles.txtSignInBtn}>Sign In with Facebook</Text>
                </Pressable>
            </SafeAreaView>
        </LinearGradient>
    );
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
        marginVertical: 10,
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
        borderWidth: 0.8,
    },
    txtSignInBtn: {
        fontWeight: "800",
        color: "white",
        textAlign: "center",
        flex: 1,
    },
});
