import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={({ route, }) => ({
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#999',    
          tabBarStyle: {
            backgroundColor: '#182534',  
            borderTopWidth: 0,
            elevation: 0,    
            shadowOpacity: 0,     

          },

          headerStyle: {
            backgroundColor: '#101923',
            borderBottomWidth: 0,
          },

          headerTitleStyle: {
            color: '#fff',
            fontWeight: 'bold',
          },

          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'index') iconName = 'home';
            else if (route.name === 'search') iconName = 'search';
            else if (route.name === 'fav') iconName = 'heart';
            else if (route.name === 'profile') iconName = 'person';

            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
        })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({color, size}) => ( <Ionicons name="book-outline" color={color} size={size} />) }} />
      <Tabs.Screen name="search" options={{ title: 'Search', tabBarIcon: ({ color, size }) => ( <Ionicons name="search-outline" color={color} size={size} /> ) }} />
      <Tabs.Screen name="fav" options={{ title: 'Fav', tabBarIcon: ({color, size}) => ( <Ionicons name="bookmarks-outline" color={color} size={size}  /> )}} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => ( <Ionicons name="person-outline" color={color} size={size} /> ) }} /> 
    </Tabs>
  );
}
