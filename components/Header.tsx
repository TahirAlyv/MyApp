import { FontAwesome5 } from '@expo/vector-icons';
 import { View, Text, StyleSheet, Platform, StatusBar,TouchableOpacity } from 'react-native';

// type HeaderProps= {
//    burgerMenu: boolean;
//     setBurgerMenu: (value: boolean) => void;
// }

export default function Header() {
    return <View style={styles.header}>
        <Text style={styles.headerText}> <FontAwesome5 name="utensils" color="white" size={22}></FontAwesome5>  Menu</Text>
    </View>
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 25,
        padding: 16,
        backgroundColor: '#ff8800ff',
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    headerText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
   
    },
    burgerText: {
        fontFamily: 'Oswald',
        color: 'white',
        fontSize: 24
    },
   
  
});