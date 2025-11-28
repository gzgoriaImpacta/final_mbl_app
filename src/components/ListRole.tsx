import React from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import RightActions from './RightActions'
import { Button } from '@react-navigation/elements'

type Props = {
    name: string
    description: string
    onSelected: () => void
    backgroundColor: string;
    textColor: string;
}

export default function ListRole({ name, description, onSelected, backgroundColor, textColor }: Props) {
    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={onSelected} style={[styles.item, { backgroundColor }]}>
                <Text style={[styles.itemName, {color: textColor}]}>{name} </Text>
                <Text style={styles.itemDescription}>{description}</Text>
            </TouchableOpacity>
        </View>
        

    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width - 10,
    },
    itemName: {
        fontSize: 18,
    },
    itemDescription: {
        color: '#555',
        fontWeight: 'bold',
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
})