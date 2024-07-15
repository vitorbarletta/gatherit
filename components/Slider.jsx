import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../configs/FireBaseConfig';

export default function Slider() {
    const [sliderList, setSliderList] = useState([]); // Inicializa com um array vazio

    useEffect(() => {
        GetSliderList();
    }, []);

    const GetSliderList = async () => {
        const q = query(collection(db, 'Slider'));
        const querySnapshot = await getDocs(q);
        const images = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            images.push(data);  // Adiciona os dados das imagens a uma lista
        });
        setSliderList(images);  // Atualiza o estado com a lista de imagens
    };

    return (
        <View>
            <FlatList
                data={sliderList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                  paddingLeft: 20,
                  marginTop: 25
                }}
                renderItem={({ item }) => (
                    <Image
                        style={{
                          width: 300,
                          height: 160,
                          borderRadius: 15,
                          marginRight: 20
                        }}
                        source={{ uri: item.imageURL }} // Usa a URL da imagem
                    />
                )}
                keyExtractor={(item) => item.imageURL} // Usa a URL da imagem como chave
            />
        </View>
    );
}

