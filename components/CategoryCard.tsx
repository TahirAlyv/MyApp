import { FontAwesome5 } from "@expo/vector-icons";
import { Text,View,StyleSheet, TouchableOpacity, useWindowDimensions} from "react-native";

export type CategoryItem= {
    id:number,
    name:string,
    icon: string
}


type CategoryCardProps = {
    item: CategoryItem,
    onAdd: (item: CategoryItem) => void
    isSelected: boolean
};


export default function CategoryCard({item,onAdd,isSelected}: CategoryCardProps) {

   const { width, height } = useWindowDimensions();
   const isPortrait = height >= width;

    return(
       <TouchableOpacity style={[styles.category, isSelected && {backgroundColor: '#c6d400ff'} ]} onPress={() => onAdd(item)}>
            <Text style={styles.icon} > <FontAwesome5 name= {item.icon} color="white" size={28}/> </Text>
                <Text>
                 {item.name}
           </Text>
          </TouchableOpacity>
    )


}

const styles= StyleSheet.create({
    category: {
    flex: 1,  
    margin: 4,  
    padding: 5,
    backgroundColor: '#ffbb00ff',
    borderRadius: 8,
    borderColor: 'black',
    alignItems: 'center',  
 
 
  },
  icon:{
    marginBottom: 8
  },
 

})