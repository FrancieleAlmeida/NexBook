import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({color, size}) => ( <Ionicons name="book-outline" color={color} size={size} />) }} />
      <Tabs.Screen name="search" options={{ title: 'Search', tabBarIcon: ({ color, size }) => ( <Ionicons name="search-outline" color={color} size={size} /> ) }} />
      <Tabs.Screen name="fav" options={{ title: 'Fav', tabBarIcon: ({color, size}) => ( <Ionicons name="bookmarks-outline" color={color} size={size}  /> )}} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => ( <Ionicons name="person-outline" color={color} size={size} /> ) }} /> 
    </Tabs>
  );
}
