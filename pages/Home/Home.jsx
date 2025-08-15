import React, { useContext, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View, Alert, ImageBackground } from "react-native";
import NavBar from "../../components/NavBar/NavBar";
import TarjetaCalentamiento from "../../components/TarjetaCalentamiento/TarjetaCalentamiento";
import TarjetaNivel from "../../components/TarjetaNivel/TarjetaNivel.jsx";
import styles from '../Home/Home.js';
import TarjetaIngresoCodigo from './TarjetaIngesoCodigo/TarjetaingresoCodigo.jsx';
import TarjetaConsejos from '../../components/TarjetaConsejos/TarjetaConsejos.jsx';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig.js';
import { CartContext } from '../../Context/Context.jsx';
import { FontAwesome5 } from '@expo/vector-icons';
import { Swing } from 'react-native-animated-spinkit';
import IconoWhatsapp from '../../components/IconoWhatsapp/IconoWhatsapp.jsx';

const Home = ({ navigation }) => {
  const [niveles, setNiveles] = useState([]);
  const { closed, setClosed, userRegistro, setUserOnline, userOnline, idiomaActual } = useContext(CartContext);
  const [codigoCorrecto, setCodigoCorrecto] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const CerrarModal = () => {
    setCodigoCorrecto(false);
    setModalVisible(false);
  };

  const obtenerNiveles = async () => {
    try {
      const nivelesCollection = collection(db, "niveles");
      const querySnapshot = await getDocs(nivelesCollection);
      let arreglo = [];
      querySnapshot.forEach((doc) => {
        arreglo.push({ id: doc.id, data: doc.data() });
      });
      setNiveles(arreglo);
    } catch (error) {
      console.error("Error obteniendo documentos: ", error);
    }
  };

  const verificarAccesoUsuario = async () => {
    if (!userOnline) return;
    try {
      setLoading(true);
      const userCollectionRef = collection(db, 'usuarios');
      const q = query(userCollectionRef, where('email', '==', userOnline?.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        setClosed(userData.access || false);
      } else {
        setClosed(false);
      }
    } catch (error) {
      console.error('Error al verificar el acceso del usuario:', error);
      Alert.alert(
        "Actualizando la base de datos",
        "Hubo un error en la solicitud. Intenta nuevamente en unos momentos.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verificarAccesoUsuario();
    obtenerNiveles();
  }, [userRegistro, userOnline]);

  if (loading) {
    return (
      <View style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Swing size={48} color="#D4AF37" />
      </View>
    );
  }

  const ordenPersonalizado = ["Introducción", "MODULO 1 - Qué es la maderoterapia", "MODULO 2 - CELULITIS", "MODULO 3 - Protocolo vientre", "Modulo 4 - protocolo parte trasera"];

  const nivelesOrdenados = niveles
    .filter((nivel) => ordenPersonalizado.includes(nivel.data.nombre))
    .sort((a, b) => ordenPersonalizado.indexOf(a.data.nombre) - ordenPersonalizado.indexOf(b.data.nombre));

  const nivelesNormales = niveles
    .filter((nivel) => nivel.data.nombre !== "Primeros pasos" && !ordenPersonalizado.includes(nivel.data.nombre))
    .sort((a, b) => {
      const orden = ["Nivel 1", "Nivel 2", "Nivel 3", "Nivel 4", "Nivel 5", "Nivel 6"];
      return orden.indexOf(a.data.nombre) - orden.indexOf(b.data.nombre);
    });

  const traduccionesTitulo = {
    espana: "Ejercicios",
    francia: "Exercices",
    italia: "Esercizi",
    inglaterra: "Exercises",
    estadosUnidos: "Exercises",
    bandera: "Übungen",
    paisesBajos: "Oefeningen",
    portugal: "Exercícios",
  };

  const traduccionesErrorCodigo = {
    espana: "Codigo incorrecto",
    italia: "Codice errato",
    francia: "Code incorrect",
    bandera: "Falscher Code",
    paisesBajos: "Verkeerde code",
    inglaterra: "Incorrect code",
    estadosUnidos: "Incorrect code",
    portugal: "Código errado",
  };

  return (
    <ImageBackground
      source={{ uri: 'https://res.cloudinary.com/dcf9eqqgt/image/upload/v1755201169/Maderotherapy_Massage_tsneis.jpg' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
       {/* Capa negra encima para oscurecer el fondo */}
          <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.63)' }} />
      <View style={styles.home}>
        <NavBar />
        <ScrollView style={styles.home__main} contentContainerStyle={styles.home__contentContainer}>
          {!closed && (
            <>
              <TarjetaIngresoCodigo setModalVisible={setModalVisible} CerrarModal={CerrarModal} setCodigoCorrecto={setCodigoCorrecto} />
              {codigoCorrecto && (
                <Text style={{ color: "red", paddingLeft: 20 }}>
                  {traduccionesErrorCodigo[idiomaActual]}
                </Text>
              )}
            </>
          )}

         

          {nivelesOrdenados.map((nivel) => (
            <TarjetaNivel
              key={nivel.id}
              data={nivel}
              navigation={navigation}
              nivel={nivel.data}
              tiempo={nivel.data.tiempoTotal}
            />
          ))}

          <View style={styles.home__tipsContainer}>
            <TarjetaConsejos />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Home;
