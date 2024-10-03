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
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home}
                options={{
                    tabBarLabel: 'Home',
                    headerShown: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Entypo name="home" size={24} color="black" />
                        ) :
                            <AntDesign name="home" size={24} color="black" />
                }}
            />
            <Tab.Screen name='Profile' component={Profile}
                options={{
                    tabBarLabel: 'Home',
                    headerShown: false,
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="person" size={24} color="black" />
                        ) :
                            <Ionicons name="person-outline" size={24} color="black" />
                }}
            />
        </Tab.Navigator>
    )
}