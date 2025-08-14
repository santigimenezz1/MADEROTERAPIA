import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home/Home.jsx'; // Ajusta la ruta si es necesario
import DetalleNivel from './DetalleNivel/DetalleNivel.jsx'
import DetalleCalientamiento from './DetalleCalentamiento/DetalleCalentamiento.jsx';
import { RFValue } from 'react-native-responsive-fontsize';
import DetalleNivelVideo from './DetalleNivel/DetalleNivelVideo/DetalleNivelVideo.jsx';
import { Text, View } from 'react-native';
import DetalleNivelNiveles from './DetalleNivelNiveles/DetalleNivelNiveles.jsx';

const Stack = createStackNavigator();



const HomeNavigator = () => {
  return (
    
    <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: "#34cee6",
          height:RFValue(110),
        },
        headerShadowVisible: false, // Esta propiedad elimina el borde inferior
        headerTitleStyle: {
          fontSize: RFValue(25),
          fontFamily: 'NunitoSans_400Regular',
          letterSpacing:2,
          color:"white"
        },
        headerTintColor: 'black',
        // Color del texto del encabezado
    }}
>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="DetalleNivel" component={DetalleNivel} options={{ title: 'Detalle del NivelASD' }} />
      <Stack.Screen name="DetalleCalentamiento" component={DetalleCalientamiento} options={{ title: 'Primeros pasos' }} />
      <Stack.Screen name="DetalleNivelVideo" component={DetalleNivelVideo} options={{ title: 'Detalle nivel video' }} />
      <Stack.Screen name="DetalleNivelNiveles" component={DetalleNivelNiveles}  options={{ title: 'Este es el detalle nivel niveles' }}>
 
</Stack.Screen>

    </Stack.Navigator>
  );
}

export default HomeNavigator;
