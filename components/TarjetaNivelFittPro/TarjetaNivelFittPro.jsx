// TarjetaNivel.jsx
import { ImageBackground, Pressable, Text, View } from "react-native";
import { useContext } from "react";
import { CartContext } from "../../Context/Context.jsx";
import styles from "./TarjetaNivelFittPro.js";

const TarjetaNivelFittPro = ({ data, nivel, tiempo, navigation, nivelNombre, rutaNivel }) => {
  const { closed, idiomaActual } = useContext(CartContext);

  // Traducciones de "Nivel"
  const traduccionesNivel = {
    espana: "Nivel",
    italia: "Livello",
    francia: "Niveau",
    bandera: "Stufe", // puedes ajustar si "bandera" tiene un idioma real
    inglaterra: "Level",
    estadosUnidos: "Level",
    paisesBajos: "Niveau",
    portugal: "Nível",
  };

  // Obtener palabra traducida
  const palabraNivel = traduccionesNivel[idiomaActual] || "Nivel";

  // Separar "Nivel1" en "Nivel" y "1"
  const match = nivelNombre.match(/^([a-zA-Z]+)(\d+)$/);
  const numero = match ? match[2] : "";
  
  // Construir texto final traducido
  const nivelNombreTraducido = `${palabraNivel} ${numero}`;

  console.log({ data });
  console.log(rutaNivel);
  console.log({ nivelNombre });


  return (
    <ImageBackground
      source={{
        uri: data.data.imagenTarjetaNivel
      }}
      style={styles.fondoImagen}
      imageStyle={{ borderRadius: 12 }}
    >
      {/* Capa oscura */}
      <View style={styles.overlay} />

      <Pressable
        onPress={() =>
          navigation.navigate("DetalleNivelNiveles", {
            rutaNivel,
            data,
            nivelNombre,
          })
        }
        style={styles.container__tarjetaNivel}
      >
        {/* Texto centrado */}
        <View style={styles.centroTexto}>
          <Text style={styles.text}>
            {nivelNombreTraducido}
          </Text>
        </View>
      </Pressable>
    </ImageBackground>
  );
};

export default TarjetaNivelFittPro;
