import { SafeAreaView,Text,StyleSheet, View } from "react-native";

 
export type FoodItem = {
  id: number;
  name: string;
  categoryId: number;
  price: number;

};

type FoodProps = {
    item: FoodItem,
    onAdd: (item: FoodItem) => void
};


export default function FoodCard({item,onAdd}: FoodProps)
{

   return (
  <SafeAreaView style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={styles.leftText}>{item.name}</Text>
      <Text style={styles.rightText}>{item.price}-$</Text>
    </View>
  </SafeAreaView>
);


}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#363636ff',
    width: '100%',
    height: 40,
    paddingLeft: 50,
    paddingTop: 5,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 8,  
    marginBottom: 1,
    marginTop: 2,
   
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    width: '80%',

  },
  leftText: {
    color: 'white',
  },
  rightText: {
    color: 'white',
    textAlign: 'right',
  },
});
