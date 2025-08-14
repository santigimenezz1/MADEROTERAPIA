// TarjetaNivel.jsx
import { ImageBackground, Pressable, Text, View } from "react-native";
import styles from "../TarjetaNivel/TarjetaNivel.js";
import { useContext } from "react";
import { CartContext } from "../../Context/Context.jsx";
import { FontAwesome } from '@expo/vector-icons';

const TarjetaNivel = ({ data, nivel, tiempo, navigation }) => {
  const { closed, idiomaActual } = useContext(CartContext);

  // Diccionario para los nombres por idioma
  const clavesNombre = {
    espana: "nombre",
    italia: "nombreItalia",
    francia: "nombreFrancia",
    bandera: "nombreAlemania",
    estadosUnidos: "nombreInglaterra",
    inglaterra: "nombreInglaterra",
    paisesBajos: "nombrePaisesBajos",
    portugal: "nombrePortugal",
  };

  // Clave del nombre según idiomaActual, con fallback a "nombre"
  const claveNombre = clavesNombre[idiomaActual] || "nombre";

  // Asignar rutaNivel según idioma
  const rutaNivel = nivel[claveNombre] || nivel.nombre;

  // Diccionario para los textos secundarios por idioma
  const clavesTextoSecundario = {
    espana: "textoSecundario",
    italia: "textoSecundarioItalia",
    francia: "textoSecundarioFrancia",
    bandera: "textoSecundarioAlemania",
    estadosUnidos: "textoSecundarioEstadosUnidos",
    inglaterra: "textoSecundarioInglaterra",
    paisesBajos: "textoSecundarioPaisesBajos",
    portugal: "textoSecundarioPortugal",
  };

  const claveTextoSecundario = clavesTextoSecundario[idiomaActual] || "textoSecundario";
  const textoSecundario = nivel[claveTextoSecundario] || nivel.textoSecundario;

  console.log({ rutaNivel });

  return (
    <ImageBackground
      source={{
        uri:
          nivel.imagen ||
          "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1747219924/4125b593-3b1a-446b-b222-6d9dd6945592_lymwxp.png",
      }}
      style={styles.fondoImagen}
      imageStyle={{ borderRadius: 12 }}
    >
      {/* Capa oscura */}
      <View style={styles.overlay} />

      <Pressable
        onPress={() => navigation.navigate("DetalleNivel", { rutaNivel, data })}
        style={styles.container__tarjetaNivel}
      >
        {/* Texto centrado */}
        <View style={styles.centroTexto}>
          <Text style={styles.text}>
            {rutaNivel}
          </Text>
        </View>

        {/* Tarjeta naranja en la esquina inferior izquierda */}
        <View style={styles.tarjetaNaranja}>
   
        </View>
      </Pressable>
    </ImageBackground>
  );
};

export default TarjetaNivel;
