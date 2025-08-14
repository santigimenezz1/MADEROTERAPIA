import React, { useEffect } from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ModalCodigoDesbloqueo from '../../../components/ModalCodigoDesbloqueo/ModalCodigoDesbloqueo';
import styles from './DetalleNivelStyles';
import { Text } from 'react-native';
import TarjetaNivel from '../../../components/TarjetaNivel/TarjetaNivel.jsx';
import TarjetaNivelFittPro from '../../../components/TarjetaNivelFittPro/TarjetaNivelFittPro.jsx';

const DetalleNivel = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { rutaNivel, data } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: rutaNivel });
  }, [navigation, rutaNivel]);


  console.log({data})
return (
  <View style={styles.container}>
    <ImageBackground
      source={{ uri: 'https://res.cloudinary.com/dcf9eqqgt/image/upload/v1747232068/20250514_1613_Entrenamiento_con_Escalera_Agilidad_remix_01jv7j73wzfw1rvhv9bc1rzhqt_dps9y5.png' }}
      style={styles.backgroundImage}
      imageStyle={styles.backgroundImageStyle}
    >
      {/* Capa negra encima para oscurecer la imagen */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          zIndex: 1,
        }}
      />

      {/* Contenido con zIndex superior para estar sobre la capa oscura */}
      <ScrollView
        style={[styles.container__detalleNivel, { zIndex: 2 }]}
        contentContainerStyle={styles.contentContainer}
      >
{data &&
  Object.entries(data.data.ejercicios)
    .sort(([nivelA], [nivelB]) => {
      // Extraemos el número de nivel (1, 2, 3...) para ordenar
      const numA = parseInt(nivelA.replace('nivel', '')) || 0;
      const numB = parseInt(nivelB.replace('nivel', '')) || 0;
      return numA - numB;
    })
    .map(([nivelNombre, ejercicios]) => (
      <View key={nivelNombre}>
        <TarjetaNivelFittPro nivelNombre={nivelNombre} navigation={navigation} rutaNivel={rutaNivel} data={data} />
      </View>
    ))}

      </ScrollView>
    </ImageBackground>
  </View>
);

};

export default DetalleNivel;
