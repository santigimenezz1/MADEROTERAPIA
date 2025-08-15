import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './NavBarStyles';
import SelectorIdioma from '../SelectorIdioma/SelectorIdioma.jsx';

const NavBar = () => {
 
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container__navBar}>
                <View style={styles.container__navBar__titulo}>
                  <Image
                     width={140}
                     height={100}
                     source={{
                       uri: 'https://res.cloudinary.com/dcf9eqqgt/image/upload/v1755200413/Dise%C3%B1o_sin_t%C3%ADtulo_-_2025-08-14T213958.434_jmjtcl.png',
                     }}
                   />
                    <Image 
                         width={25}
                        height={25} source={{uri:"https://res.cloudinary.com/dcf9eqqgt/image/upload/v1724232180/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/LOGO/Imagen_10-8-24_a_las_19.15_bkb9x9.svg"}} />

                </View>
                <View style={styles.container__navBar__menu}>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default NavBar;
