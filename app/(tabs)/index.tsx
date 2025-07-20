import CategoryCard, { CategoryItem } from '@/components/CategoryCard';
import FoodCard, { FoodItem } from '@/components/FoodCard';
import Header from '@/components/Header';
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView ,TouchableOpacity,FlatList, Alert,SectionList,KeyboardAvoidingView,Platform, useWindowDimensions, ScrollView} from 'react-native';
import { TextInput } from 'react-native'; 



const initialCategory = [
  { id: 1, name: "Drinks",icon: "cocktail" },
  { id: 2, name: "Pizza" , icon: "pizza-slice"},
  { id: 3, name: "Burgers", icon: "hamburger" },
  { id: 4, name: "Seafood",icon: "fish"},
];


const initialFoods= [
  {id:2, name: 'Margherita Pizza',categoryId: 2, price:45},
  {id:2, name: 'Coca-Cola Zero',categoryId: 1, price:15.9},
  {id:3, name: 'Fanta',categoryId: 1, price:21.2},
  {id:4, name: 'Classic Cheeseburger',categoryId: 3, price:20}
]
 

export default function HomeScreen() {

 
  const [categories,setCategories]=useState<CategoryItem[]>(initialCategory)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [food,setFood]=useState('');
  const [price,setPrice]=useState('');
  const [isOpen,setIsOpen]=useState<boolean>(false)
  const [foods,setFoods]=useState<FoodItem []>(initialFoods)
  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;
  const numColumns=isPortrait? 2:4

  const handleSubmit=(item: CategoryItem) => {
    if(item.id===selectedCategoryId){
       setSelectedCategoryId(null);
       return;
    }
    setSelectedCategoryId(item.id)
  }

  const handleIsOpen= () => {

    setIsOpen(!isOpen);
  }

  const handleAdd= () => {

    if (selectedCategoryId !== null && selectedCategoryId !== undefined)
        {
            
          const newFood: FoodItem = {
          id: Number(Date.now()),
          name: food,
          categoryId: Number(selectedCategoryId),
          price: parseFloat(price),
      
          };
          setFoods((prevFoods) => [...prevFoods, newFood]);
          console.log(newFood);

          setFood('');
          setPrice('');
          setSelectedCategoryId(null);

          Alert.alert("successfully!","food Added")
       
        }


     Alert.alert("Please select a category above.")
  }


const getSectionedFoods = () => {
  if (selectedCategoryId === null) {
    return [];
  }
  const category = categories.find(cat => cat.id === selectedCategoryId);
  if (!category) return [];

  return [
    {
      title: category.name,
      data: foods.filter(food => food.categoryId === selectedCategoryId)
    }
  ];
};

  
  
 
  return (
  <SafeAreaView style={styles.main}>
    <Header />

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SectionList
        sections={getSectionedFoods()}
        keyExtractor={(item) => item.id.toString()}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <>
 
            <View style={[styles.container]}>
              <FlatList
                data={categories}
                key={numColumns}
                keyExtractor={(item) => item.id.toString()}
                numColumns={numColumns}
                renderItem={({ item }) => (
                  <CategoryCard
                    item={item}
                    onAdd={() => handleSubmit(item)}
                    isSelected={item.id === selectedCategoryId}
                  />
                )}
              />
            </View>

 
            <View style={styles.inputContainer}>
              
              {isOpen ? (
              
                <View style={{ gap: 10 }}>
                    <Text style={{fontSize: 12, textAlign:'center'}}>Select category from above..</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Write Product Name..."
                    value={food}
                    onChangeText={setFood}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Write Price..."
                    value={price}
                    onChangeText={setPrice}
                  />
                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} onPress={handleAdd}>
                      <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, { width: 100, backgroundColor: '#0077ffff' }]}
                      onPress={handleIsOpen}
                    >
                      <Text style={[styles.buttonText, { fontSize: 12 }]}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.button, { width: 100, backgroundColor: '#0077ffff' }]}
                  onPress={handleIsOpen}
                >
                  <Text style={[styles.buttonText, { fontSize: 12 }]}>Add Product</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        }
        renderItem={({ item }) => <FoodCard item={item} onAdd={() => handleAdd()} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ backgroundColor: '#eee', padding: 8, marginTop: 50 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{title}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </KeyboardAvoidingView>
  </SafeAreaView>
);

}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  main:{
    backgroundColor: '#ffe7a4ff',
    height: '100%',
 
  },
  input: {
    backgroundColor: "white",
    width: 230,
    height: 40,
    padding: 10
  },
  inputContainer: {
    alignItems: 'center',
  },
  button: {
    height: 40,
    width: 70,
    backgroundColor: 'green',
    borderRadius: 5,
    justifyContent: 'center',
 
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10
  },
  buttonRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  marginTop: 5,
}
   
});