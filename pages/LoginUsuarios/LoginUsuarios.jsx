import React, { useContext } from "react";
import { Image, View, Text, ImageBackground } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./LoginUsuarios.js";
import BotonLoginUsuario from "../../components/BotonLoginUsuario/BotonLoginUsuario.jsx";
import { CartContext } from "../../Context/Context.jsx";

const LoginUsuarios = ({ navigation }) => {
  const { paisSeleccionado, setPaisSeleccionado } = useContext(CartContext);

  const textos = {
    espana: { selectLanguage: "Seleccionar idioma", selectPlaceholder: "Selecciona tu país" },
    francia: { selectLanguage: "Choisir la langue", selectPlaceholder: "Sélectionnez votre pays" },
    italia: { selectLanguage: "Seleziona la lingua", selectPlaceholder: "Seleziona il tuo paese" },
    portugal: { selectLanguage: "Selecionar idioma", selectPlaceholder: "Selecione seu país" },
    paisesBajos: { selectLanguage: "Taal selecteren", selectPlaceholder: "Selecteer je land" },
    bandera: { selectLanguage: "Sprache wählen", selectPlaceholder: "Wählen Sie Ihr Land" },
    inglaterra: { selectLanguage: "Select language", selectPlaceholder: "Select your country" },
    estadosUnidos: { selectLanguage: "Select language", selectPlaceholder: "Select your country" },
  };

  const idioma = textos[paisSeleccionado] || textos.inglaterra;

  return (
    <ImageBackground
      source={{
        uri: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1755198477/Maderotherapy_xpjkj4.jpg",
      }}
      style={styles.backgroundImage}
      imageStyle={{ resizeMode: "cover" }} // fondo como en el segundo código
    >
      {/* Capa negra para oscurecer */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          zIndex: 1,
        }}
      />

      {/* Contenido */}
      <View style={[styles.container__loginUsuarios, { zIndex: 2 }]}>
        <Image
          width={300}
          height={200}
          source={{
            uri: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1755200413/Dise%C3%B1o_sin_t%C3%ADtulo_-_2025-08-14T213958.434_jmjtcl.png",
          }}
        />
        

        <View
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          
          <Text style={{ color: "white", fontSize: 26, fontWeight: "bold" }}>
            {idioma.selectLanguage}
          </Text>

          <Picker
            selectedValue={paisSeleccionado}
            onValueChange={(itemValue) => setPaisSeleccionado(itemValue)}
            style={{
              width: 250,
              backgroundColor: "#4A4A4A",
              marginBottom: 20,
              color: "white",
            }}
            dropdownIconColor="white"
          >
            <Picker.Item label={idioma.selectPlaceholder} value="" />
            <Picker.Item label="Español (España)" value="espana" />
            <Picker.Item label="Français (France)" value="francia" />
            <Picker.Item label="Deutsch (Deutschland)" value="bandera" />
            <Picker.Item label="Italiano (Italia)" value="italia" />
            <Picker.Item label="Nederlands (Nederland)" value="paisesBajos" />
            <Picker.Item label="English (United States)" value="estadosUnidos" />
            <Picker.Item label="Português (Portugal)" value="portugal" />
          </Picker>
        </View>

        <View>
          <BotonLoginUsuario navigation={navigation} paisSeleccionado={paisSeleccionado} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginUsuarios;
