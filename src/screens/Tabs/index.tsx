import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RootStackParamList } from './@types'
import Home from '../Home'
import Profile from '../Profile'

const Tab = createBottomTabNavigator<RootStackParamList>()

export default function Tabs() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: "rgba(0,0,0,0.5)",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                shadowOpacity: 4,
                shadowRadius: 4,
                elevation: 4,
                shadowOffset: {
                    width: 0,
                    height: -4
                },
                borderTopWidth: 0
            }
        }}>
            <Tab.Screen name='Home' component={Home}
                options={{
                    tabBarLabel: 'Home',
                    headerShown: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Entypo name="home" size={24} color="white" />
                        ) :
                            <AntDesign name="home" size={24} color="white" />
                }}
            />
            <Tab.Screen name='Profile' component={Profile}
                options={{
                    tabBarLabel: 'Home',
                    headerShown: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="person" size={24} color="white" />
                        ) :
                            <Ionicons name="person-outline" size={24} color="white" />
                }}
            />
        </Tab.Navigator>
    )
}