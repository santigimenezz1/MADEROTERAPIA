import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Image, Alert, ImageBackground } from 'react-native';
import styles from './InicioSesion';
import { login } from '../../../firebaseConfig.js';
import { CartContext } from '../../../Context/Context.jsx';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Swing } from 'react-native-animated-spinkit';

const InicioSesion = () => {
  const { setUsuarioOn, userOnline, setUserOnline, paisSeleccionado } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const textos = {
    espana: { email: 'Correo electrónico', password: 'Contraseña', login: 'Iniciar sesión' },
    francia: { email: 'E-mail', password: 'Mot de passe', login: 'Connexion' },
    italia: { email: 'Email', password: 'Password', login: 'Accedi' },
    portugal: { email: 'Email', password: 'Senha', login: 'Entrar' },
    paisesBajos: { email: 'E-mail', password: 'Wachtwoord', login: 'Inloggen' },
    bandera: { email: 'E-Mail', password: 'Passwort', login: 'Anmelden' },
    inglaterra: { email: 'Email', password: 'Password', login: 'Login' },
    estadosUnidos: { email: 'Email', password: 'Password', login: 'Login' },
  };

  const idioma = textos[paisSeleccionado] || textos.inglaterra;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('El email es obligatorio'),
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
  });

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      await login(values.email, values.password, setUsuarioOn);
      setUserOnline({ email: values.email.toLowerCase() });
      console.log('✅ Usuario logueado correctamente:', values.email.toLowerCase());
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched }) => (
        <ImageBackground
          source={{ uri:'https://res.cloudinary.com/dcf9eqqgt/image/upload/v1755201169/Maderotherapy_Massage_tsneis.jpg' }}
          style={styles.backgroundImage}
          imageStyle={{ resizeMode: 'cover' }} // fondo igual que LoginUsuarios
        >
          {/* Capa negra para oscurecer */}
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

          {/* Contenido */}
          <View style={[styles.container__inicioSesion, { zIndex: 2 }]}>
            <Image
              width={230}
              height={150}
              source={{
                uri: 'https://res.cloudinary.com/dcf9eqqgt/image/upload/v1755200413/Dise%C3%B1o_sin_t%C3%ADtulo_-_2025-08-14T213958.434_jmjtcl.png',
              }}
            />
      

            {isLoading && (
              <View style={{ marginVertical: 20 }}>
                <Swing size={48} color="#D4AF37" />
              </View>
            )}

            <View style={styles.container__form}>
             
              <TextInput
                onChangeText={(text) => {
                  setFieldTouched('email', false);
                  handleChange('email')(text);
                }}
                onBlur={handleBlur('email')}
                value={values.email}
                style={styles.input}
                placeholderTextColor="white"
                placeholder={idioma.email}
              />
              {touched.email && errors.email && (
                <Text style={{ color: 'red' }}>{errors.email}</Text>
              )}

              <TextInput
                onChangeText={(text) => {
                  setFieldTouched('password', false);
                  handleChange('password')(text);
                }}
                onBlur={handleBlur('password')}
                value={values.password}
                style={styles.input}
                placeholderTextColor="white"
                placeholder={idioma.password}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={{ color: 'red' }}>{errors.password}</Text>
              )}

              <TouchableOpacity
                onPress={() => {
                  setFieldTouched('email', true);
                  setFieldTouched('password', true);
                  handleSubmit();
                }}
                style={styles.botonLoginUsuario}
                disabled={isLoading}
              >
                <Text style={styles.botonText}>{idioma.login}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      )}
    </Formik>
  );
};

export default InicioSesion;
