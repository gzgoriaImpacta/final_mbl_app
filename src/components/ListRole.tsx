import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import RightActions from './RightActions'

type Props = {
    name: string
    description: string
    onUpdate: () => void
    onDelete: () => void
}

export default function ListItem({ name, description, onUpdate, onDelete }: Props) {
    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={() => <RightActions onUpdate={onUpdate} onDelete={onDelete} />}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemName}>{name} </Text>
                    <Text style={styles.itemDescription}>{description}</Text>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
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
})