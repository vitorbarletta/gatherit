import { View, FlatList, Image, StyleSheet, Text } from 'react-native';
import React from 'react';

export default function Slider({ data, error }) {
    return (
        <View>
            {error ? (
                <Text style={{ color: 'red' }}>{error}</Text>
            ) : (
                <FlatList
                    data={data}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.flatList}
                    renderItem={({ item }) => (
                        <Image
                            style={styles.image}
                            source={{ uri: item.imageURL }}
                            onError={(error) =>
                                console.log("Erro ao carregar a imagem:", error.nativeEvent.error)
                            }
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
