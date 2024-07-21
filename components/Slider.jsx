import { View, FlatList, Image, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../configs/FireBaseConfig';

export default function Slider() {
    const [sliderList, setSliderList] = useState([]); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        GetSliderList();
    }, []);

    const GetSliderList = async () => {
        try {
            const q = query(collection(db, 'Slider'));
            const querySnapshot = await getDocs(q);
            const images = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                images.push(data);
            });
            setSliderList(images);
        } catch (err) {
            console.error("Erro ao buscar a lista de slides:", err);
            setError(err.message);
        }
    };

    return (
        <View>
            {error ? (
                <Text style={{ color: 'red' }}>{error}</Text>
            ) : (
                <FlatList
                    data={sliderList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.flatList}
                    renderItem={({ item }) => (
                        <Image
                            style={styles.image}
                            source={{ uri: item.imageURL }}
                            onError={(error) => console.log("Erro ao carregar a imagem:", error.nativeEvent.error)}
                        />
                    )}
                    keyExtractor={(item) => item.imageURL} 
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    flatList: {
        paddingLeft: 20,
        marginTop: 25,
    },
    image: {
        width: 300,
        height: 160,
        borderRadius: 15,
        marginRight: 20,
        backgroundColor: '#eee',
    },
});
